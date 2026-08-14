import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { apiWriteRateLimit } from "@/lib/rateLimit";
import User from "@/models/User";

const adminSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Enter a valid email").max(200),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters")
    .max(200),
});

export async function POST(req: NextRequest) {
  const setupKey = req.headers.get("x-admin-setup-key");
  const configuredSetupKey = process.env.ADMIN_SETUP_SECRET;

  console.log("ADMIN_SETUP_SECRET loaded:", !!configuredSetupKey);
  console.log("Setup header received:", !!setupKey);
  console.log("Setup secrets match:", setupKey === configuredSetupKey);

  if (!configuredSetupKey || !setupKey || setupKey !== configuredSetupKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!apiWriteRateLimit(`admin-setup:${ip}`)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();
  const parsed = adminSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  await connectDB();

  const existingAdmin = await User.findOne({ role: "admin" }).lean();
  if (existingAdmin) {
    return NextResponse.json(
      { error: "An admin user already exists" },
      { status: 409 },
    );
  }

  const email = parsed.data.email.toLowerCase();
  const existingUser = await User.findOne({ email }).lean();

  if (existingUser) {
    return NextResponse.json(
      { error: "A user with this email already exists" },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  const user = await User.create({
    name: parsed.data.name,
    email,
    passwordHash,
    role: "admin",
  });

  return NextResponse.json(
    {
      message: "Admin user created successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
    { status: 201 },
  );
}
