import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PROD_URL =
  'https://api.phonepe.com/apis/hermes/pg/v1/pay';

export async function POST(request) {
  try {
    const merchantId = process.env.PHONEPE_MERCHANT_ID?.trim();
    const saltKey = process.env.PHONEPE_SALT_KEY?.trim();
    const saltIndex =
      process.env.PHONEPE_SALT_INDEX?.trim() || '1';

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '');

    if (!merchantId) {
      console.error('PHONEPE_MERCHANT_ID missing');

      return NextResponse.json(
        {
          success: false,
          message: 'PhonePe Merchant ID missing.',
        },
        { status: 500 }
      );
    }

    if (!saltKey) {
      console.error('PHONEPE_SALT_KEY missing');

      return NextResponse.json(
        {
          success: false,
          message: 'PhonePe Salt Key missing.',
        },
        { status: 500 }
      );
    }

    if (!baseUrl) {
      console.error('NEXT_PUBLIC_BASE_URL missing');

      return NextResponse.json(
        {
          success: false,
          message: 'Website Base URL missing.',
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const amount = Number(body?.amount || 999);
    const userDetails = body?.userDetails || {};

    const email = String(userDetails.email || '')
      .trim()
      .toLowerCase();

    const phone = String(userDetails.phone || '')
      .replace(/\D/g, '');

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: 'User email is required.',
        },
        { status: 400 }
      );
    }

    if (!phone || phone.length !== 10) {
      return NextResponse.json(
        {
          success: false,
          message: 'Valid 10-digit mobile number is required.',
        },
        { status: 400 }
      );
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid payment amount.',
        },
        { status: 400 }
      );
    }

    /*
     * Keep transaction ID simple.
     * Do NOT use email as transaction ID.
     */
    const merchantTransactionId =
      `TXN${Date.now()}${crypto.randomInt(100000, 999999)}`;

    /*
     * Merchant User ID should be stable and simple.
     */
    const merchantUserId =
      `USER_${crypto
        .createHash('sha256')
        .update(email)
        .digest('hex')
        .slice(0, 20)}`;

    const callbackUrl =
      `${baseUrl}/api/payment/phonepe-callback`;

    const payload = {
      merchantId,

      merchantTransactionId,

      merchantUserId,

      amount: Math.round(amount * 100),

      redirectUrl: callbackUrl,

      redirectMode: 'POST',

      callbackUrl,

      mobileNumber: phone,

      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };

    console.log('PhonePe Request:', {
      merchantId,
      merchantTransactionId,
      merchantUserId,
      amount: payload.amount,
      callbackUrl,
      saltIndex,
    });

    /*
     * Base64 encode payload
     */
    const base64Payload = Buffer
      .from(JSON.stringify(payload))
      .toString('base64');

    /*
     * PhonePe checksum:
     *
     * SHA256(
     *   base64Payload +
     *   /pg/v1/pay +
     *   saltKey
     * )
     *
     * + ### + saltIndex
     */
    const checksumString =
      base64Payload +
      '/pg/v1/pay' +
      saltKey;

    const sha256 = crypto
      .createHash('sha256')
      .update(checksumString)
      .digest('hex');

    const xVerifyHeader =
      `${sha256}###${saltIndex}`;

    /*
     * Production PhonePe API
     */
    const phonePeRes = await fetch(PROD_URL, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-VERIFY': xVerifyHeader,
      },

      body: JSON.stringify({
        request: base64Payload,
      }),

      cache: 'no-store',
    });

    const rawResponse = await phonePeRes.text();

    let phonePeData;

    try {
      phonePeData = JSON.parse(rawResponse);
    } catch {
      phonePeData = {
        raw: rawResponse,
      };
    }

    /*
     * IMPORTANT DEBUG LOG
     */
    console.log(
      'PhonePe HTTP Status:',
      phonePeRes.status
    );

    console.log(
      'PhonePe API Response:',
      JSON.stringify(phonePeData, null, 2)
    );

    /*
     * Payment page URL
     */
    const redirectUrl =
      phonePeData?.data?.instrumentResponse?.redirectInfo?.url;

    if (
      phonePeRes.ok &&
      phonePeData?.success === true &&
      redirectUrl
    ) {
      return NextResponse.json({
        success: true,

        redirectUrl,

        transactionId:
          merchantTransactionId,
      });
    }

    /*
     * PhonePe rejected request
     */
    return NextResponse.json(
      {
        success: false,

        message:
          phonePeData?.message ||
          phonePeData?.code ||
          'PhonePe Payment Initialization Failed',

        code:
          phonePeData?.code || null,

        phonePeStatus:
          phonePeRes.status,
      },
      {
        status: 400,
      }
    );

  } catch (error) {
    console.error(
      'PhonePe Initiate Error:',
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error?.message ||
          'Server error initiating PhonePe Payment.',
      },
      {
        status: 500,
      }
    );
  }
}