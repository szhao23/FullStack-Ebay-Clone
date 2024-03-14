import prsima from "@/app/libs/prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// POST Method without being logged in
export async function POST() {
  const supabase = createServerComponentClient({ cookies });

  try {
    // Try to get the current active user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If no active user, throw error
    if (!user) throw Error();

    // Fetch the body
    const body = await req.json();

    // Create the order
    const order = await prisma.orders.create({
      data: {
        user_id: user?.id,
        stripe_id: body.stripe_id,
        name: body.name,
        address: body.address,
        zipcode: body.zipcode,
        city: body.city,
        country: body.country,
        total: Number(body.total),
      },
    });

    // Save each individual item associated with the order
    // Loop through each product
    body.products.forEach(async (prod) => {
      await prisma.orderItem.create({
        data: {
          order_id: order.id,
          product_id: Number(prod.id),
        },
      });
    });

    await prisma.$disconnect();
    return NextResponse.json("Order Complete", { status: 200 });
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    return new NextResponse("Uh oh, Something went wrong...", { status: 400 });
  }
}
