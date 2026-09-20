// src\app\api\payment\razorpay-verify\route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import adminApp from '@/lib/firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userDetails,
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        { success: false, message: 'Server configuration error (Secret missing)' },
        { status: 500 }
      );
    }

    // 1. Verify Payment Signature
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // 2. Validate Email
    const email = userDetails?.email?.toLowerCase().trim();
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'User email missing' },
        { status: 400 }
      );
    }

    const db = getFirestore(adminApp);
    const membershipRef = db.collection('memberships').doc(email);

    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(startDate.getDate() + 365);

    const docSnap = await membershipRef.get();
    const existingData = docSnap.exists ? docSnap.data() : {};

    const newPayment = {
      amount: 999,
      date: startDate.toISOString(),
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      gateway: 'Razorpay',
      status: 'PAID',
    };

    const paymentHistory = existingData.paymentHistory
      ? [...existingData.paymentHistory, newPayment]
      : [newPayment];

    // 3. Save to Firestore
    await membershipRef.set(
      {
        ...userDetails,
        email,
        amount: 999,
        status: 'approved',
        paymentStatus: 'PAID',
        membershipStatus: 'ACTIVE',
        gateway: 'Razorpay',
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        lastTransactionId: razorpay_payment_id,
        startDate: startDate.toISOString(),
        expiryDate: expiryDate.toISOString(),
        paymentHistory,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return NextResponse.json({ success: true, message: 'Membership activated successfully!' });
  } catch (error) {
    console.error('Razorpay verification error:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Verification failed' },
      { status: 500 }
    );
  }
}