// src\app\api\payment\razorpay-order\route.js
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { success: false, message: 'Razorpay keys missing in environment.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const amount = Number(body?.amount) || 999;
    const userDetails = body?.userDetails || {};

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: Math.round(amount * 100), // Amount in paise (999 * 100 = 99900)
      currency: 'INR',
      receipt: `rcpt_${Date.now().toString().slice(-8)}`,
      notes: {
        email: userDetails.email || '',
        phone: userDetails.phone || '',
        name: userDetails.fullName || '',
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (error) {
    console.error('Razorpay order create error:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Order creation failed' },
      { status: 500 }
    );
  }
}