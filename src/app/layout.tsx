import { localizedMetadata } from "@/i18n/server";
import { cookies } from "next/headers";
import { LanguageProvider, Text } from "@/components/language";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme";
import { Motion } from "@/components/motion";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
const sans = localFont({
  src: [
    { path: "./fonts/nunito-400.ttf", weight: "400" },
    { path: "./fonts/nunito-700.ttf", weight: "700" },
    { path: "./fonts/nunito-900.ttf", weight: "900" },
  ],
  variable: "--font-body",
  display: "swap",
});
const display = localFont({
  src: [
    { path: "./fonts/bricolage-400.ttf", weight: "400" },
    { path: "./fonts/bricolage-600.ttf", weight: "600" },
    { path: "./fonts/bricolage-700.ttf", weight: "700" },
    { path: "./fonts/bricolage-800.ttf", weight: "800" },
  ],
  variable: "--font-display",
  display: "swap",
});
const pageMetadata: Metadata = {
  metadataBase: new URL(process.env.BETTER_AUTH_URL || "http://localhost:3000"),
  title: {
    default: "Asteria — Your corner of the cosmos",
    template: "%s · Asteria",
  },
  description:
    "Discover your birth chart, follow the rhythms of the sky, and explore a free astrology library. A thoughtful space for self-discovery.",
  applicationName: "Asteria",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Asteria" },
  icons: { icon: "/icon.svg", apple: "/icons/apple-touch-icon.png" },
  openGraph: {
    title: "Asteria — Your universe, a little closer.",
    description:
      "Free charts, daily reflections, and an open astrology library.",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image" },
};
export async function generateMetadata() {
  return localizedMetadata(pageMetadata);
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const language =
    (await cookies()).get("asteria_language")?.value === "sw" ? "sw" : "en";
  const catalog =
    language === "sw" ? (await import("@/i18n/sw.json")).default : {};
  return (
    <html
      lang={language}
      className={`${sans.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LanguageProvider initialLanguage={language} initialCatalog={catalog}>
          <ThemeProvider>
            <a className="skip-link" href="#content">
              <Text>Skip to content</Text>
            </a>
            <div id="content">
              <Motion>{children}</Motion>
            </div>
            <Toaster position="bottom-right" richColors />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
