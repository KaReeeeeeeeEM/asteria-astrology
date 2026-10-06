import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Asteria — Your corner of the cosmos",
    short_name: "Asteria",
    description:
      "Free birth charts, thoughtful daily readings, and an open astrology library.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8f5ee",
    theme_color: "#f8f5ee",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
