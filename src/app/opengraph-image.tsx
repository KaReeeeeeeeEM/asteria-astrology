import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#f8f5ee",
        color: "#272920",
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
          color: "#a45c40",
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
          fontFamily: "serif",
        }}
      >
        Written in the stars.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 82,
          fontFamily: "serif",
          fontStyle: "italic",
          color: "#a45c40",
        }}
      >
        Discovered by you.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 25,
          marginTop: 40,
          color: "#686b61",
        }}
      >
        Free birth charts · Daily reflections · An open astrology library
      </div>
    </div>,
    size,
  );
}
