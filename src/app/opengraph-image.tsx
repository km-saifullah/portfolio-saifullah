import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const alt = "Khaled Md Saifullah — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#060907",
        backgroundImage:
          "radial-gradient(circle at 15% 20%, rgba(34,197,94,0.35), transparent 45%), radial-gradient(circle at 85% 80%, rgba(61,255,171,0.25), transparent 45%)",
      }}
    >
      <div
        style={{
          fontSize: 26,
          color: "#3dffab",
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 24,
        }}
      >
        $ whoami
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 88,
          fontWeight: 700,
          color: "#eaf6ef",
          lineHeight: 1.05,
        }}
      >
        {SITE_NAME}
      </div>
      <div
        style={{
          marginTop: 20,
          fontSize: 36,
          color: "#8fa89b",
        }}
      >
        Software Engineer
      </div>
    </div>,
    { ...size },
  );
}
