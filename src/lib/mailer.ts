import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const to = process.env.CONTACT_RECEIVER_EMAIL || process.env.GMAIL_USER;

  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`,
    to,
    replyTo: email,
    subject: `[Portfolio] ${subject || "New message from " + name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="color:#0F3D2E;">New contact form message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; border-left: 3px solid #16C784; padding-left: 12px;">${escapeHtml(
          message,
        )}</p>
      </div>
    `,
  });
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
