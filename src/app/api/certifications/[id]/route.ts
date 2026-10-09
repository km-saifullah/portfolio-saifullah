import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Certification from "@/models/Certification";
import { auth } from "@/lib/auth";
import { certificationSchema } from "@/lib/certificationValidation";
import cloudinary from "@/lib/cloudinary";

async function requireAdmin() {
  const session = await auth();
  return session && (session.user as { role?: string })?.role === "admin";
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
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
  const certification = await Certification.findById(id);
  if (!certification) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const previousPublicId = certification.imagePublicId;

  certification.set(parsed.data);
  await certification.save();

  if (previousPublicId && previousPublicId !== parsed.data.imagePublicId) {
    await cloudinary.uploader.destroy(previousPublicId).catch(() => null);
  }

  return NextResponse.json({ certification });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await connectDB();
  const certification = await Certification.findById(id);
  if (!certification) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (certification.imagePublicId) {
    await cloudinary.uploader
      .destroy(certification.imagePublicId)
      .catch(() => null);
  }

  await certification.deleteOne();
  return NextResponse.json({ ok: true });
}
