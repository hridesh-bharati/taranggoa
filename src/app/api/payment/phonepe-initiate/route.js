import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const merchantId = process.env.PHONEPE_MERCHANT_ID?.trim();
    const saltKey = process.env.PHONEPE_SALT_KEY?.trim();
    const saltIndex = process.env.PHONEPE_SALT_INDEX?.trim() || '1';
    const baseUrlHost = process.env.PHONEPE_HOST_URL?.trim() || 'https://api.phonepe.com/apis/hermes';

    if (!merchantId || !saltKey) {
      return NextResponse.json(
        { success: false, message: 'PhonePe environment variables missing on server.' },
        { status: 500 }
      );
    }

    const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
    const protocol = request.headers.get('x-forwarded-proto') || 'https';

    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim();
    if (!baseUrl || baseUrl.includes('localhost')) {
      baseUrl = `${protocol}://${host}`;
    }
    baseUrl = baseUrl.replace(/\/$/, '');

    const body = await request.json();
    const amount = Number(body?.amount);
    const userDetails = body?.userDetails || {};

    const email = String(userDetails.email || '').trim().toLowerCase();
    const phone = String(userDetails.phone || '').replace(/\D/g, '');

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ success: false, message: 'Invalid payment amount.' }, { status: 400 });
    }

    if (!email || !/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { success: false, message: 'Valid email and 10-digit mobile number required.' },
        { status: 400 }
      );
    }

    const merchantTransactionId = `TXN${Date.now()}${crypto.randomInt(100000, 999999)}`;
    const merchantUserId = `USER_${crypto.createHash('sha256').update(email).digest('hex').slice(0, 16)}`;

    const apiPath = '/pg/v1/pay';
    const fullPayUrl = `${baseUrlHost.replace(/\/$/, '')}${apiPath}`;

    // S2S Webhook Endpoint
    const callbackUrl = `${baseUrl}/api/payment/phonepe-callback?email=${encodeURIComponent(email)}`;
    // Frontend User Redirect URL
    const redirectUrl = `${baseUrl}/membership-user-page?status=verifying&txn=${merchantTransactionId}`;

    const payload = {
      merchantId,
      merchantTransactionId,
      merchantUserId,
      amount: Math.round(amount * 100), // Paisa conversion
      redirectUrl,
      redirectMode: 'GET',
      callbackUrl,
      mobileNumber: phone,
      paymentInstrument: { type: 'PAY_PAGE' },
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const checksumString = base64Payload + apiPath + saltKey;
    const sha256 = crypto.createHash('sha256').update(checksumString).digest('hex');
    const xVerifyHeader = `${sha256}###${saltIndex}`;

    const phonePeRes = await fetch(fullPayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-VERIFY': xVerifyHeader,
      },
      body: JSON.stringify({ request: base64Payload }),
      cache: 'no-store',
    });

    const phonePeData = await phonePeRes.json();
    const gatewayRedirectUrl = phonePeData?.data?.instrumentResponse?.redirectInfo?.url;

    if (phonePeRes.ok && phonePeData?.success === true && gatewayRedirectUrl) {
      return NextResponse.json({
        success: true,
        redirectUrl: gatewayRedirectUrl,
        transactionId: merchantTransactionId,
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: phonePeData?.message || 'PhonePe Payment Initialization Failed',
        phonePeCode: phonePeData?.code || String(phonePeRes.status),
      },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: error?.message || 'Server error.' }, { status: 500 });
  }
}