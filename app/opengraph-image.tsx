import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dor Noy — Full Stack Developer + SDR";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#030014",
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(79, 70, 229, 0.30), transparent 55%), radial-gradient(circle at 75% 80%, rgba(34, 211, 238, 0.22), transparent 55%)",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 34px",
            borderRadius: 9999,
            border: "2px solid rgba(34, 211, 238, 0.55)",
            background: "rgba(34, 211, 238, 0.1)",
            color: "#67e8f9",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 5,
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          👋 Welcome
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 130,
            height: 130,
            borderRadius: 65,
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            fontSize: 60,
            fontWeight: 900,
            color: "white",
            marginBottom: 36,
            boxShadow: "0 10px 50px rgba(79, 70, 229, 0.55)",
          }}
        >
          DN
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 148,
            fontWeight: 900,
            letterSpacing: -4,
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 24,
            lineHeight: 1,
          }}
        >
          Dor Noy
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 38,
            color: "#cbd5e1",
            fontWeight: 400,
            letterSpacing: 1,
          }}
        >
          Full Stack Developer + SDR
        </div>

        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 56,
            fontSize: 22,
            color: "#64748b",
            letterSpacing: 4,
          }}
        >
          dor-noy.com
        </div>
      </div>
    ),
    { ...size }
  );
}
