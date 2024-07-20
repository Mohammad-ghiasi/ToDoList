import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const database = new PrismaClient();

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
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

    if (!id || (!reqBody.title && reqBody.completed === undefined)) {
      return NextResponse.json(
        {
          message:
            "ID and at least one field (title or completed) are required",
        },
        { status: 400 }
      );
    }

    const existingTodoItem = await database.todoItem.findFirst({
      where: {
        id: parseInt(id),
        userId: decodedToken.id,
      },
    });

    if (!existingTodoItem) {
      return NextResponse.json(
        { message: "Todo item not found or does not belong to the user" },
        { status: 404 }
      );
    }

    const updatedTodoItem = await database.todoItem.update({
      where: { id: parseInt(id) },
      data: {
        title: reqBody.title ?? existingTodoItem.title,
        completed: reqBody.completed ?? existingTodoItem.completed,
      },
    });

    return NextResponse.json(
      { message: "Todo item updated successfully", todo: updatedTodoItem },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating todo item:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
