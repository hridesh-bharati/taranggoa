// src/app/api/payment/create-order/route.js
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    // Guard Check for missing Keys
    if (!key_id || !key_secret) {
      return NextResponse.json(
        { success: false, message: 'Razorpay API keys are missing in environment variables (.env.local)' },
        { status: 500 }
      );
    }

    const { amount, email } = await request.json();

    const instance = new Razorpay({ key_id, key_secret });

    const options = {
      amount: (amount || 999) * 100, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: { userEmail: email },
    };

    const order = await instance.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('RAZORPAY ORDER CREATION ERROR:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error creating order' },
      { status: 500 }
    );
  }
}