import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#ffffff",
        color: "#000000",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "#000000",
          letterSpacing: 5,
        }}
      >
        ASTERIA
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 82,
          marginTop: 30,
          fontFamily: "sans-serif",
        }}
      >
        Your universe,
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 82,
          fontFamily: "sans-serif",
          fontWeight: 700,
          color: "#000000",
        }}
      >
        a little closer.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 25,
          marginTop: 40,
          color: "#666666",
        }}
      >
        Free birth charts · Daily reflections · An open astrology library
      </div>
    </div>,
    size,
  );
}
