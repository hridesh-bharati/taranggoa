import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PROD_URL = 'https://api.phonepe.com/apis/hermes/pg/v1/pay';

export async function POST(request) {
  try {
    const merchantId = process.env.PHONEPE_MERCHANT_ID?.trim();
    const saltKey = process.env.PHONEPE_SALT_KEY?.trim();
    const saltIndex = process.env.PHONEPE_SALT_INDEX?.trim() || '1';

    // Automatically detect production Vercel domain if env is localhost or missing
    const host = request.headers.get('host') || 'taranggoa-three.vercel.app';
    const protocol = host.includes('localhost') ? 'http' : 'https';

    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim().replace(/\/$/, '');
    if (!baseUrl || baseUrl.includes('localhost')) {
      baseUrl = `${protocol}://${host}`;
    }

    if (!merchantId || !saltKey) {
      return NextResponse.json(
        { success: false, message: 'PhonePe Merchant ID or Salt Key missing in environment.' },
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

    const merchantTransactionId = `TXN${Date.now()}${crypto.randomInt(100000, 999999)}`;
    const merchantUserId = `USER_${crypto.createHash('sha256').update(email).digest('hex').slice(0, 20)}`;
    const callbackUrl = `${baseUrl}/api/payment/phonepe-callback?email=${encodeURIComponent(email)}`;

    const payload = {
      merchantId,
      merchantTransactionId,
      merchantUserId,
      amount: Math.round(amount * 100),
      redirectUrl: callbackUrl,
      redirectMode: 'POST',
      callbackUrl,
      mobileNumber: phone,
      paymentInstrument: { type: 'PAY_PAGE' },
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const checksumString = base64Payload + '/pg/v1/pay' + saltKey;
    const sha256 = crypto.createHash('sha256').update(checksumString).digest('hex');
    const xVerifyHeader = `${sha256}###${saltIndex}`;

    const phonePeRes = await fetch(PROD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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

    const redirectUrl = phonePeData?.data?.instrumentResponse?.redirectInfo?.url;

    if (phonePeRes.ok && phonePeData?.success === true && redirectUrl) {
      return NextResponse.json({
        success: true,
        redirectUrl,
        transactionId: merchantTransactionId,
      });
    }

    console.error('PhonePe API Error Response:', phonePeData);

    return NextResponse.json(
      {
        success: false,
        message: phonePeData?.message || phonePeData?.code || 'PhonePe Payment Initialization Failed',
        phonePeCode: phonePeData?.code || null,
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Server Initiate Catch Error:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error initiating payment.' },
      { status: 500 }
    );
  }
}