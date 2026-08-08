import { NextResponse } from 'next/server';
import adminApp from '@/lib/firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || 'http://localhost:3000';

  try {
    const formData = await request.formData();
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email');

    const code = formData.get('code');
    const transactionId = formData.get('transactionId');
    const merchantId = formData.get('merchantId');
    const amountPaid = formData.get('amount') ? Number(formData.get('amount')) / 100 : 999;

    if (code === 'PAYMENT_SUCCESS' && userEmail) {
      const cleanEmail = userEmail.toLowerCase().trim();
      const db = getFirestore(adminApp);
      const membershipRef = db.collection('memberships').doc(cleanEmail);

      const startDate = new Date();
      const expiryDate = new Date();
      expiryDate.setFullYear(startDate.getFullYear() + 1);

      const docSnap = await membershipRef.get();
      const existingData = docSnap.exists ? docSnap.data() : {};

      const newPayment = {
        amount: amountPaid,
        date: startDate.toISOString(),
        paymentId: transactionId || 'PHONEPE_TXN',
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
          phonepeMerchantId: merchantId || '',
          lastTransactionId: transactionId || '',
          paymentHistory,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      return NextResponse.redirect(`${baseUrl}/user/user-membership-page?status=success&txn=${transactionId}`, { status: 303 });
    }

    return NextResponse.redirect(`${baseUrl}/user/user-membership-page?status=failed`, { status: 303 });
  } catch (error) {
    console.error('PhonePe Callback Error:', error);
    return NextResponse.redirect(`${baseUrl}/user/user-membership-page?status=error`, { status: 303 });
  }
}