import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const database = new PrismaClient();

// ****   DELETE /api/posts/deleteItem/?id=19   ****
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const token = request.cookies.get("token")?.value;

    if (!id) {
      return NextResponse.json(
        { message: "Invalid request, id parameter is required" },
        { status: 400 }
      );
    }

    // Check for valid token
    if (!token) {
      return NextResponse.json(
        { message: "Authorization required" },
        { status: 401 }
      );
    }

    // Verify token
    const decodedToken: any = jwt.verify(token, "my secret");

    if (!decodedToken) {
      return NextResponse.json(
        { message: "Authorization required" },
        { status: 401 }
      );
    }

    // Delete the todo item if it exists and belongs to the user
    const existingTodoItem = await database.todoItem.deleteMany({
      where: {
        id: parseInt(id),
        userId: decodedToken.id,
      },
    });

    if (existingTodoItem.count === 0) {
      return NextResponse.json(
        { message: "Todo item not found or does not belong to the user" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Todo item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
