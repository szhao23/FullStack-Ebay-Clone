import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middle(req) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  // Check if we have an active session
  const { data } = await supabase.auth.getSession();
}
