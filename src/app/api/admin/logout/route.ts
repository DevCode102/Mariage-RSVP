import { NextResponse } from "next/server";
import { getLogoutCookieOptions } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  const cookie = getLogoutCookieOptions();
  response.cookies.set(cookie.name, cookie.value, cookie);
  return response;
}
