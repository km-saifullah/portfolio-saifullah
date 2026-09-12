import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogView from "@/models/BlogView";
import { viewRateLimit } from "@/lib/rateLimit";

const VISITOR_COOKIE = "visitor_id";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!viewRateLimit(ip)) {
    return NextResponse.json({ counted: false }, { status: 429 });
  }

  const { id: slug } = await params;

  await connectDB();

  const blog = await Blog.findOne({ slug, published: true })
    .select("_id")
    .lean();

  if (!blog) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const existingVisitorId = req.cookies.get(VISITOR_COOKIE)?.value;
  const isNewVisitor = !existingVisitorId;
  const visitorId = existingVisitorId || randomUUID();

  let counted = false;
  try {
    await BlogView.create({ blog: blog._id, visitorId });
    await Blog.updateOne({ _id: blog._id }, { $inc: { readCount: 1 } });
    counted = true;
  } catch (err: unknown) {
    const code = (err as { code?: number })?.code;
    if (code !== 11000) {
      console.error("Failed to record blog view:", err);
    }
  }

  const res = NextResponse.json({ counted });

  if (isNewVisitor) {
    res.cookies.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  return res;
}
