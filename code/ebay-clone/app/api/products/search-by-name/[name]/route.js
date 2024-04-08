import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

// GET Method
export async function GET(req, context) {
  try {
    // Get name from params because we will be using the name to search
    const { name } = context.params;

    // Get items
    const items = await prisma.products.findMany({
      // Search by name, and fetch the first 5 that appear
      take: 5,
      where: {
        title: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    await prisma.$disconnect();
    // Return items
    return NextResponse.json(items);
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    return new NextResponse("Uh oh, Something went wrong...", { status: 400 });
  }
}
