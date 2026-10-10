import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getCertificationStats } from "@/lib/certificationStats";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session || (session.user as { role?: string })?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = await getCertificationStats();

  return NextResponse.json(
    { stats },
    { headers: { "Cache-Control": "no-store" } },
  );
}
