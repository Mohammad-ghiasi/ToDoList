import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const database = new PrismaClient();

// ****   POST /todos   ****
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const token = request.cookies.get("token")?.value;

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

    // Form validation
    if (!reqBody.title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const existingTodo = await database.todoItem.findFirst({
      where: {
        title: reqBody.title,
        userId: decodedToken.id,
      },
    });

    if (existingTodo) {
      return NextResponse.json(
        { message: "Todo item with this title already exists" },
        { status: 400 }
      );
    }

    // Create new todo item
    const newTodoItem = await database.todoItem.create({
      data: {
        title: reqBody.title,
        userId: decodedToken.id,
      },
    });
    // NextResponse.revalidate('/')
    return NextResponse.json(
      { message: "Todo item created successfully", todo: newTodoItem },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}