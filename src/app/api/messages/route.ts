import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";
import { auth } from "@/lib/auth";

async function requireAdmin() {
  const session = await auth();
  return session && (session.user as { role?: string })?.role === "admin";
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const messages = await Message.find({}).sort({ createdAt: -1 }).lean();

  return NextResponse.json({ messages });
}
