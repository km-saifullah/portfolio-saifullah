import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { auth } from "@/lib/auth";
import { blogSchema } from "@/lib/validation";
import cloudinary from "@/lib/cloudinary";
import { sanitizeBlogHtml } from "@/lib/sanitizeHtml";

async function requireAdmin() {
  const session = await auth();

  return session && (session.user as { role?: string })?.role === "admin";
}

export async function GET(
  _req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  await connectDB();

  const { id } = await params;

  const blog = await Blog.findById(id).lean();

  if (!blog) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ blog });
}

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const parsed = blogSchema.partial().safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message ?? "Invalid input",
      },
      { status: 400 },
    );
  }

  const updateData = {
    ...parsed.data,
  };

  if (parsed.data.content !== undefined) {
    const sanitizedContent = sanitizeBlogHtml(parsed.data.content);

    if (!sanitizedContent.trim()) {
      return NextResponse.json(
        { error: "Blog content is required" },
        { status: 400 },
      );
    }

    updateData.content = sanitizedContent;
  }

  await connectDB();

  const { id } = await params;

  const blog = await Blog.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!blog) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ blog });
}

export async function DELETE(
  _req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { id } = await params;

  const blog = await Blog.findById(id);

  if (!blog) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (blog.coverImagePublicId) {
    await cloudinary.uploader
      .destroy(blog.coverImagePublicId)
      .catch(() => null);
  }

  await blog.deleteOne();

  return NextResponse.json({ ok: true });
}
