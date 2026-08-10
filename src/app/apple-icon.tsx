import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS home-screen icon — same monogram as `icon.tsx`, larger canvas. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#163c2c",
        borderRadius: 36,
        color: "#ffffff",
        fontSize: 108,
        fontWeight: 700,
        fontFamily: "sans-serif",
      }}
    >
      S
    </div>,
    { ...size },
  );
}
