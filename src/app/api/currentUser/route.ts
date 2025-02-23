import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();

    return NextResponse.json({ data: currentUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }
}
