import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const database = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // Validate request method
    if (request.method !== "POST") {
      return NextResponse.json(
        { message: "Method Not Allowed!" },
        { status: 405 }
      );
    }

    if (!reqBody.email || !reqBody.password) {
      return NextResponse.json(
        { message: "Please fill all the fields." },
        { status: 400 }
      );
    }

    const user = await database.user.findFirst({
      where: {
        email: reqBody.email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    const valid = await bcrypt.compare(reqBody.password, user.password);

    if (!valid) {
      return NextResponse.json(
        { message: "Password not valid!" },
        { status: 400 }
      );
    }

    const tokendata = { id: user.id };
    const token = jwt.sign(tokendata, "my secret", {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "User logged in successfully" },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true, path: "/" });
    return response;

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
