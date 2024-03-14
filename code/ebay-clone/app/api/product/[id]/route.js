import prsima from "@/app/libs/prisma";
import { NextResponse } from "next/server";

// GET Method without being logged in
export async function GET(req, context) {
  const supabase = createServerComponentClient({ cookies });

  try {
    // Get the ID parameter
    const { id } = context.params;

    // Get Product by ID
    const product = await prisma.products.findFirst({
      where: { id: Number(id) },
    });

    await prisma.$disconnect();
    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    return new NextResponse("Uh oh, Something went wrong...", { status: 400 });
  }
}
