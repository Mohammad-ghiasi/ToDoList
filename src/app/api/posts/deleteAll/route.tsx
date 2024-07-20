import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  try {
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

    // Delete all todo items for the user
    await prisma.todoItem.deleteMany({
      where: {
        userId: decodedToken.id,
      },
    });

    return NextResponse.json(
      { message: "All todo items deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting all todo items:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
