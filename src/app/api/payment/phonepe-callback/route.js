import { NextResponse } from 'next/server';
import crypto from 'crypto';
import adminApp from '@/lib/firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const saltKey = process.env.PHONEPE_SALT_KEY?.trim();
    const saltIndex = process.env.PHONEPE_SALT_INDEX?.trim() || '1';

    const body = await request.json();
    const xVerifyHeader = request.headers.get('X-VERIFY');

    // PhonePe sends payload as { response: "BASE64_STRING" }
    if (!body?.response) {
      return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 });
    }

    // Checksum verification
    if (xVerifyHeader && saltKey) {
      const calculatedSha = crypto.createHash('sha256').update(body.response + saltKey).digest('hex');
      const expectedVerify = `${calculatedSha}###${saltIndex}`;
      if (xVerifyHeader !== expectedVerify) {
        return NextResponse.json({ success: false, message: 'Invalid Checksum' }, { status: 401 });
      }
    }

    // Decode base64 payload
    const decodedString = Buffer.from(body.response, 'base64').toString('utf-8');
    const responseData = JSON.parse(decodedString);

    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email') || responseData?.data?.merchantUserId;

    if (responseData.success && responseData.code === 'PAYMENT_SUCCESS' && userEmail) {
      const cleanEmail = userEmail.toLowerCase().trim();
      const db = getFirestore(adminApp);
      const membershipRef = db.collection('memberships').doc(cleanEmail);

      const txnData = responseData.data;
      const amountPaid = txnData?.amount ? txnData.amount / 100 : 999;
      const transactionId = txnData?.merchantTransactionId || 'PHONEPE_TXN';

      const startDate = new Date();
      const expiryDate = new Date();
      expiryDate.setFullYear(startDate.getFullYear() + 1);

      const docSnap = await membershipRef.get();
      const existingData = docSnap.exists ? docSnap.data() : {};

      const newPayment = {
        amount: amountPaid,
        date: startDate.toISOString(),
        paymentId: transactionId,
        providerReferenceId: txnData?.providerReferenceId || '',
        status: 'PAID',
        gateway: 'PhonePe',
      };

      const paymentHistory = existingData.paymentHistory ? [...existingData.paymentHistory, newPayment] : [newPayment];

      await membershipRef.set(
        {
          email: cleanEmail,
          status: 'approved',
          paymentStatus: 'PAID',
          amount: amountPaid,
          startDate: startDate.toISOString(),
          expiryDate: expiryDate.toISOString(),
          phonepeMerchantId: txnData?.merchantId || '',
          lastTransactionId: transactionId,
          paymentHistory,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      return NextResponse.json({ success: true, message: 'Payment recorded successfully' });
    }

    return NextResponse.json({ success: false, message: 'Payment was not successful' }, { status: 200 });
  } catch (error) {
    console.error('PhonePe Webhook Processing Error:', error);
    return NextResponse.json({ success: false, message: error?.message }, { status: 500 });
  }
}