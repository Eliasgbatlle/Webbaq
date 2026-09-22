import { ImageResponse } from "next/og"

export const dynamic = "force-static"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(16,185,129,0.25), transparent 50%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
            }}
          />
          <span style={{ color: "#10b981", fontSize: "28px", fontFamily: "monospace" }}>
            webbaq.dev
          </span>
        </div>
        <div
          style={{
            fontSize: "96px",
            color: "#ffffff",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          WebBAQ
        </div>
        <div
          style={{
            fontSize: "36px",
            color: "rgba(255,255,255,0.7)",
            marginTop: "24px",
            maxWidth: "900px",
          }}
        >
          Diseño Web y SEO en Barranquilla desde $90.000/mes
        </div>
      </div>
    ),
    { ...size }
  )
}
