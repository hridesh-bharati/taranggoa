// src/app/api/auth/session/route.js
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

const COOKIE_NAME = "session";

export async function POST(request) {
  try {
    const body = await request.json();
    const { idToken } = body;

    if (!idToken) {
      return NextResponse.json(
        { success: false, message: "ID token required" },
        { status: 400 }
      );
    }

    // 5 Days Expiry
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    // Directly creates session and validates idToken inside SDK
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    const response = NextResponse.json({
      success: true,
      message: "Session created",
    });

    response.cookies.set(COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 5,
    });

    return response;
  } catch (error) {
    console.error("SESSION CREATE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Session creation failed" },
      { status: 401 } // 401 status code better reflects invalid/expired tokens
    );
  }
}