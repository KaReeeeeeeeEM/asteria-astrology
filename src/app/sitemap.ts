import type { MetadataRoute } from "next";
import { articles, signs } from "@/lib/knowledge";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.BETTER_AUTH_URL || "http://localhost:3000";
  return [
    "",
    "/chart",
    "/numerology",
    "/sky",
    "/horoscopes",
    "/compatibility",
    "/learn",
    "/zodiac",
    "/about",
    "/privacy",
    "/terms",
    ...articles.map((a) => `/learn/${a.slug}`),
    ...signs.map((s) => `/zodiac/${s.name.toLowerCase()}`),
  ].map((path) => ({
    url: base + path,
    changeFrequency:
      path === "/sky" || path === "/horoscopes" ? "daily" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
