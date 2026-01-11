import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function serializeData(data: any) {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { login, senha } = body;

    if (!login || !senha) {
      return NextResponse.json(
        { error: "Login and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.usuario.create({
      data: {
        login,
        senha, // Storing in plain text as per user requirement (Not recommended for production)
      },
    });

    return NextResponse.json(serializeData(user), { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await prisma.usuario.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(serializeData(users));
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}
