import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendContactEmail } from "@/lib/mailer";
import { contactRateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (!contactRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many messages sent. Please try again later." },
        { status: 429 },
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }

    if (parsed.data.company) {
      return NextResponse.json({ ok: true });
    }

    const { name, email, subject, message } = parsed.data;
    await sendContactEmail({ name, email, subject, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
