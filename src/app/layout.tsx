import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Motion } from "@/components/motion";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
const sans = localFont({src:'./fonts/dm-sans-normal.woff2',variable:'--font-body',weight:'100 1000',display:'swap'});
const serif = localFont({src:[{path:'./fonts/cormorant-normal.woff2',weight:'300 700',style:'normal'},{path:'./fonts/cormorant-italic.woff2',weight:'300 700',style:'italic'}],variable:'--font-editorial',display:'swap'});
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
    title: "Asteria — Written in the stars. Discovered by you.",
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
  themeColor: "#f8f5ee",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <div id="content">
          <Motion>{children}</Motion>
        </div>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
