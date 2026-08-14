import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { auth } from "@/lib/auth";
import { projectSchema } from "@/lib/validation";
import { apiWriteRateLimit } from "@/lib/rateLimit";

export async function GET(req: NextRequest) {
  await connectDB();
  const category = req.nextUrl.searchParams.get("category");

  const filter: Record<string, unknown> = {};
  if (category && category !== "all") filter.category = category;

  const projects = await Project.find(filter)
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return NextResponse.json({ projects });
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

  const body = await req.json();
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  await connectDB();

  const existing = await Project.findOne({ slug: parsed.data.slug });
  if (existing) {
    return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
  }

  const project = await Project.create(parsed.data);
  return NextResponse.json({ project }, { status: 201 });
}
