import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json(); // รับ JSON จาก Request
    const { email, password, carNumber, role } = body;

    if (!role || !carNumber || !email || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    // บันทึกข้อมูลลง DB
    const newEMS = await prisma.ems.create({
      data: { carNumber, email, password, role },
    });

    return new Response(JSON.stringify(newEMS), { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
