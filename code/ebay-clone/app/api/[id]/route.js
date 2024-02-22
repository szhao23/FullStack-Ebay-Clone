import prsima from "@/app/libs/prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Get Method without being logged in
export async function GET() {
  const supabase = createServerComponentClient({ cookies });

  try {
    // Try to get the current active user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If no active user, throw error
    if (!user) throw Error();

    // If all is good and there is a user do this
    const res = await prisma.addresses.findFirst({
      where: { user_id: user?.id },
    });

    await prisma.$disconnect();
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    return new NextResponse("Uh oh, Something went wrong...", { status: 400 });
  }
}
