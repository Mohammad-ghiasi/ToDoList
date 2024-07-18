import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { singup } from "@/app/sing-up/page";
import jwt from "jsonwebtoken";

const database = new PrismaClient();

// ****   POST   ****
export async function POST(request: NextRequest) {
  try {
    const reqBody: singup = await request.json();

    // Validate request method
    if (request.method !== "POST") {
      return NextResponse.json(
        { message: "Method Not Allowed!" },
        { status: 405 }
      );
    }

    // Form validation
    if (!reqBody.email || !reqBody.name || !reqBody.password) {
      return NextResponse.json(
        { message: "Please fill all the fields." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const user = await database.user.findFirst({
      where: {
        email: reqBody.email,
      },
    });
    if (user) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.password, salt);

    // Add new user
    const newUser = await database.user.create({
      data: {
        email: reqBody.email,
        name: reqBody.name,
        password: hashedPassword,
      },
    });

    // if (newUser) {
    //   return NextResponse.json(
    //     { message: "Account created successfully", user: newUser },
    //     { status: 201 }
    //   );
    // }

    const isuser = await database.user.findFirst({
      where: {
        email: reqBody.email,
      },
    });

    if (!isuser) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    const valid = await bcrypt.compare(reqBody.password, isuser.password);

    if (!valid) {
      return NextResponse.json(
        { message: "Password not valid!" },
        { status: 400 }
      );
    }

    const tokendata = { id: isuser.id };
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
