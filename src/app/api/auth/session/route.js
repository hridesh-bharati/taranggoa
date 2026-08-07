import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export const runtime = "nodejs";
const COOKIE_NAME = "session";

export async function POST(request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ success: false, message: "ID token required" }, { status: 400 });
    }

    // Verify token validity & revocation before session creation
    await adminAuth.verifyIdToken(idToken, true);

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 Days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    const response = NextResponse.json({ success: true, message: "Session created" });

    response.cookies.set(COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 5,
    });

    return response;
  } catch (error) {
    console.error("SESSION ERROR:", error);
    return NextResponse.json({ success: false, message: "Unauthorized token" }, { status: 401 });
  }
}