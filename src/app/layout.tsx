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
export const metadata: Metadata = {
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
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6ff" },
    { media: "(prefers-color-scheme: dark)", color: "#121127" },
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#content">
            Skip to content
          </a>
          <div id="content">
            <Motion>{children}</Motion>
          </div>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
