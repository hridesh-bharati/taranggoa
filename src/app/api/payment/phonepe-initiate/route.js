import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';

    if (!merchantId || !saltKey) {
      return NextResponse.json(
        { success: false, message: 'PhonePe API keys missing in .env' },
        { status: 500 }
      );
    }

    const { amount, userDetails } = await request.json();
    const merchantTransactionId = `TXN_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const merchantUserId = userDetails.email ? userDetails.email.replace(/[^a-zA-Z0-9]/g, '_') : 'USER_1001';

    const payload = {
      merchantId: merchantId,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: merchantUserId,
      amount: (amount || 999) * 100, // Amount in Paise
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payment/phonepe-callback`,
      redirectMode: 'POST',
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payment/phonepe-callback`,
      mobileNumber: userDetails.phone || '',
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const checksumString = base64Payload + '/pg/v1/pay' + saltKey;
    const sha256 = crypto.createHash('sha256').update(checksumString).digest('hex');
    const xVerifyHeader = `${sha256}###${saltIndex}`;

    // PhonePe Production Host: https://api.phonepe.com/apis/hermes/pg/v1/pay
    // PhonePe Sandbox/Testing Host: https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay
    const phonepeHost = process.env.PHONEPE_HOST_URL || 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';

    const phonePeRes = await fetch(phonepeHost, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': xVerifyHeader,
        'accept': 'application/json'
      },
      body: JSON.stringify({ request: base64Payload })
    });

    const phonePeData = await phonePeRes.json();

    if (phonePeData.success && phonePeData.data?.instrumentResponse?.redirectInfo?.url) {
      return NextResponse.json({
        success: true,
        redirectUrl: phonePeData.data.instrumentResponse.redirectInfo.url,
        transactionId: merchantTransactionId
      });
    } else {
      return NextResponse.json(
        { success: false, message: phonePeData.message || 'PhonePe Payment Gateway Error' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('PhonePe Initiate Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error initiating PhonePe Payment' },
      { status: 500 }
    );
  }
}