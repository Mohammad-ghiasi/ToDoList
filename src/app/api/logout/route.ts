import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const database = new PrismaClient();

// ****   GET   ****
export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (token) {
      const response = NextResponse.json({
        message: "Token removed successfully",
      });
      response.cookies.set("token", "", { maxAge: 0 }); // Set maxAge to 0 to expire the cookie immediately
      return response;
  }

  return NextResponse.json({ message: "No token found" });
}
