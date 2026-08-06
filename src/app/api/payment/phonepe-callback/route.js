import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const code = formData.get('code');
    const transactionId = formData.get('transactionId');
    const merchantId = formData.get('merchantId');

    if (code === 'PAYMENT_SUCCESS') {
      // 1. Transaction Status Verified
      const now = new Date();
      const expiryDate = new Date();
      expiryDate.setFullYear(now.getFullYear() + 1);

      // Return Page to User
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/user/user-membership-page?status=success&txn=${transactionId}`,
        { status: 303 }
      );
    } else {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/user/user-membership-page?status=failed`,
        { status: 303 }
      );
    }
  } catch (error) {
    console.error('PhonePe Callback Error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/user/user-membership-page?status=error`,
      { status: 303 }
    );
  }
}