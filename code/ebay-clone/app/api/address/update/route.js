import prsima from "@/app/libs/prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Update Method without being logged in
export async function POST(req) {
  const supabase = createServerComponentClient({ cookies });

  try {
    // Try to get the current active user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If no active user, throw error
    if (!user) throw Error();

    const body = await req.json();

    const res = await prisma.address.update({
      where: { id: Number(body.addressId) },
      data: {
        name: body.name,
        address: body.address,
        zipcode: body.zipcode,
        city: body.city,
        country: body.country,
      },
    });

    await prisma.$disconnect();
    return new NextResponse.json(res);
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    return new NextResponse("Uh oh, Something went wrong...", { status: 400 });
  }
}
