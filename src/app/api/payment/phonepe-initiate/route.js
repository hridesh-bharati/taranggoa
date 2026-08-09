import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// PhonePe Production URL
const PROD_URL = 'https://api.phonepe.com/apis/hermes/pg/v1/pay';

export async function POST(request) {
  try {
    const merchantId = process.env.PHONEPE_MERCHANT_ID?.trim();
    const saltKey = process.env.PHONEPE_SALT_KEY?.trim();
    const saltIndex = process.env.PHONEPE_SALT_INDEX?.trim() || '1';

    // Vercel Domain / Host detection
    const host = request.headers.get('host') || 'taranggoa-three.vercel.app';
    const protocol = host.includes('localhost') ? 'http' : 'https';

    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim().replace(/\/$/, '');
    if (!baseUrl || baseUrl.includes('localhost')) {
      baseUrl = `${protocol}://${host}`;
    }

    if (!merchantId || !saltKey) {
      console.error('PhonePe Env Missing:', { merchantId: Boolean(merchantId), saltKey: Boolean(saltKey) });
      return NextResponse.json(
        { success: false, message: 'PhonePe Merchant Credentials Missing in Server Env.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const amount = Number(body?.amount || 999);
    const userDetails = body?.userDetails || {};

    const email = String(userDetails.email || '').trim().toLowerCase();
    const phone = String(userDetails.phone || '').replace(/\D/g, '');

    if (!email || !phone || phone.length !== 10) {
      return NextResponse.json(
        { success: false, message: 'Valid email and 10-digit mobile number required.' },
        { status: 400 }
      );
    }

    // Clean IDs
    const merchantTransactionId = `TXN${Date.now()}${crypto.randomInt(100000, 999999)}`;
    const merchantUserId = `USER_${crypto.createHash('sha256').update(email).digest('hex').slice(0, 16)}`;
    const callbackUrl = `${baseUrl}/api/payment/phonepe-callback?email=${encodeURIComponent(email)}`;

    // PhonePe Payload Structure
    const payload = {
      merchantId: merchantId,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: merchantUserId,
      amount: Math.round(amount * 100), // in paise
      redirectUrl: callbackUrl,
      redirectMode: 'POST',
      callbackUrl: callbackUrl,
      mobileNumber: phone,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    // 1. Base64 Payload
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');

    // 2. SHA256 Checksum Calculation: SHA256(base64Payload + "/pg/v1/pay" + saltKey) + "###" + saltIndex
    const apiEndpoint = '/pg/v1/pay';
    const checksumString = base64Payload + apiEndpoint + saltKey;

    const sha256 = crypto
      .createHash('sha256')
      .update(checksumString)
      .digest('hex');

    const xVerifyHeader = `${sha256}###${saltIndex}`;

    // PhonePe API Call
    const phonePeRes = await fetch(PROD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-VERIFY': xVerifyHeader,
      },
      body: JSON.stringify({ request: base64Payload }),
      cache: 'no-store',
    });

    const rawResponse = await phonePeRes.text();
    let phonePeData;

    try {
      phonePeData = JSON.parse(rawResponse);
    } catch {
      phonePeData = { raw: rawResponse };
    }

    console.log('PhonePe API Status:', phonePeRes.status, phonePeData);

    const redirectUrl = phonePeData?.data?.instrumentResponse?.redirectInfo?.url;

    if (phonePeRes.ok && phonePeData?.success === true && redirectUrl) {
      return NextResponse.json({
        success: true,
        redirectUrl,
        transactionId: merchantTransactionId,
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: phonePeData?.message || phonePeData?.code || '401 Unauthorized Gateway Request',
        phonePeCode: phonePeData?.code || String(phonePeRes.status),
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Server Catch Error:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error initiating payment.' },
      { status: 500 }
    );
  }
}