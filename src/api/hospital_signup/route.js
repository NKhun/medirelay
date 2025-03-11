import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json(); // รับ JSON จาก Request
    const { name, location, email, password } = body;

    if (!name || !location || !email || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    // บันทึกข้อมูลลง DB
    const newHospital = await prisma.hospital.create({
      data: { name, email, password, location },
    });

    return new Response(JSON.stringify(newHospital), { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
