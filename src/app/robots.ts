import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/api", "/reset-password", "/verify-email"],
    },
    sitemap: `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/sitemap.xml`,
  };
}
