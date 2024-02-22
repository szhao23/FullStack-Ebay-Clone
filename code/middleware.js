import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middle(req) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  // Check if we have an active session
  const { data } = await supabase.auth.getSession();

  // If there is a current session active for logged in and the path selected is on the auth page, we want to redirect them to the main page because we don't want them to see the auth screen
  if (data?.session && req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  //   If there is NO current session active, and the page selected is either of the below we want to redirect them because they aren't logged in and shouldn't be able to see
  if (
    !data?.session &&
    (req.nextUrl.pathname.startsWith("/checkout") ||
      req.nextUrl.pathname.startsWith("/success") ||
      req.nextUrl.pathname.startsWith("/orders") ||
      req.nextUrl.pathname.startsWith("/address"))
  ) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return res;
}
