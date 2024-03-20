import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Update Method without being logged in
export async function GET() {
  const supabase = createServerComponentClient({ cookies });

  try {
    // Try to get the current active user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If no active user, throw error
    if (!user) throw Error();

    // Get all of the order items associated with an order
    const orders = await prisma.orders.findMany({
      where: { user_id: user?.id },
      orderBy: { id: "desc" },
      include: {
        orderItem: {
          include: {
            product: true,
          },
        },
      },
    });

    await prisma.$disconnect();
    return new NextResponse.json(orders);
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    return new NextResponse("Uh oh, Something went wrong...", { status: 400 });
  }
}
