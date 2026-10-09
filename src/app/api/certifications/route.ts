import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Certification from "@/models/Certification";
import { auth } from "@/lib/auth";
import { certificationSchema } from "@/lib/certificationValidation";
import { apiWriteRateLimit } from "@/lib/rateLimit";

export async function GET() {
  await connectDB();

  const certifications = await Certification.find({})
    .sort({ featured: -1, createdAt: -1 })
    .lean();

  return NextResponse.json({ certifications });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role?: string })?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!apiWriteRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = certificationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  await connectDB();
  const certification = await Certification.create(parsed.data);

  return NextResponse.json({ certification }, { status: 201 });
}
