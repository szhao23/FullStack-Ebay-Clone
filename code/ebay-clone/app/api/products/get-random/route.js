import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

// GET Method
export async function GET() {
  try {
    // Get ALL products and count them
    const productsCount = await prisma.products.count();
    const skip = Math.floor(Math.random() * productsCount);

    const products = await prisma.products.findMany({
      take: 5,
      skip: skip,
      orderBy: { id: "asc" },
    });

    // Get items

    await prisma.$disconnect();
    // Return items
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    return new NextResponse("Uh oh, Something went wrong...", { status: 400 });
  }
}
