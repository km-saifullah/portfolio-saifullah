import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { auth } from "@/lib/auth";
import { projectSchema } from "@/lib/validation";
import cloudinary from "@/lib/cloudinary";

async function requireAdmin() {
  const session = await auth();
  return session && (session.user as { role?: string })?.role === "admin";
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  const project = await Project.findById(id).lean();
  if (!project)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ project });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = projectSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  await connectDB();
  const { id } = await params;
  const project = await Project.findByIdAndUpdate(id, parsed.data, {
    new: true,
    runValidators: true,
  });
  if (!project)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ project });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { id } = await params;
  const project = await Project.findById(id);
  if (!project)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (project.imagePublicId) {
    await cloudinary.uploader.destroy(project.imagePublicId).catch(() => null);
  }

  await project.deleteOne();
  return NextResponse.json({ ok: true });
}
