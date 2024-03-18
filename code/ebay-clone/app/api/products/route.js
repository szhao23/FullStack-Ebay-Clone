import prsima from "@/app/libs/prisma";
import { NextResponse } from "next/server";

// GET Method
export async function GET() {
  try {
    // Get ALL Products
    const products = await prisma.products.findMany();

    await prisma.$disconnect();
    // Return ALL products
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    return new NextResponse("Uh oh, Something went wrong...", { status: 400 });
  }
}
