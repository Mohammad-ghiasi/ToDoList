import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const database = new PrismaClient();

// ****   GET   ****
export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Authorization required" },
      { status: 401 }
    );
  }

  const decodedToken: any = jwt.verify(token, "my secret");

  if (!decodedToken) {
    return NextResponse.json(
      { message: "Authorization required" },
      { status: 401 }
    );
  }

  const user = await database.user.findFirst({
    where: {
      id: decodedToken.id,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ data: user }, { status: 200 });
}
