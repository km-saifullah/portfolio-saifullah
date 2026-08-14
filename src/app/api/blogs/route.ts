import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { auth } from "@/lib/auth";
import { blogSchema } from "@/lib/validation";
import { apiWriteRateLimit } from "@/lib/rateLimit";

export async function GET(req: NextRequest) {
  await connectDB();
  const includeUnpublished = req.nextUrl.searchParams.get("all") === "true";

  let filter: Record<string, unknown> = { published: true };

  if (includeUnpublished) {
    const session = await auth();
    if (session && (session.user as { role?: string })?.role === "admin") {
      filter = {};
    }
  }

  const blogs = await Blog.find(filter).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ blogs });
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
  const parsed = blogSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  await connectDB();

  const existing = await Blog.findOne({ slug: parsed.data.slug });
  if (existing) {
    return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
  }

  const blog = await Blog.create(parsed.data);
  return NextResponse.json({ blog }, { status: 201 });
}
