import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const database = new PrismaClient();

// ****   GET /todos   ****
export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value;

        // Check for valid token
        if (!token) {
            return NextResponse.json(
                { message: "Authorization required" },
                { status: 401 }
            );
        }

        // Verify token
        const decodedToken: any = jwt.verify(token, 'my secret');

        if (!decodedToken) {
            return NextResponse.json(
                { message: "Authorization required" },
                { status: 401 }
            );
        }

        // Fetch todo items for the user
        const todos = await database.todoItem.findMany({
            where: {
                userId: decodedToken.id,
            },
            select: {
                title: true,
                completed: true,
                data: true,
                id: true
            },
        });

        return NextResponse.json(
            { todos: todos },
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
