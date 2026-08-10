import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Browser-tab favicon — a monogram in the same brand-green square the
 * sidebar logo uses (`SchedraMark`'s `bg-brand-800` swatch), generated
 * via next/og's `ImageResponse` (built into Next.js, no new dependency)
 * rather than a hand-authored binary .ico, so it stays deterministic and
 * in sync with the actual brand color token. Replaces the generic
 * create-next-app placeholder that shipped here before the rename.
 */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#163c2c",
        borderRadius: 7,
        color: "#ffffff",
        fontSize: 20,
        fontWeight: 700,
        fontFamily: "sans-serif",
      }}
    >
      S
    </div>,
    { ...size },
  );
}
