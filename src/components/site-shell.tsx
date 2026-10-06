"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo, LogoMark } from "./logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme";
import { PWAInstall } from "./pwa";
import { authClient } from "@/lib/auth-client";
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const { data } = authClient.useSession();
  const links = [
    ["Explore", "/zodiac"],
    ["Today’s sky", "/sky"],
    ["Learn", "/learn"],
    ["Numerology", "/numerology"],
    ["About", "/about"],
  ];
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} data-active={path.startsWith(href)}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions"><ThemeToggle/>
          <Link href={data ? "/dashboard" : "/signin"} className="signin-link">
            {data ? "My dashboard" : "Log in"}
          </Link>
          <Button asChild size="sm">
            <Link href={data ? "/dashboard/charts" : "/signup"}>
              {data ? "My charts" : "Begin your journey"}
              <ArrowUpRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links
            .concat([
              ["Birth chart", "/chart"],
              ["Horoscopes", "/horoscopes"],
              ["Compatibility", "/compatibility"],
              [data ? "Dashboard" : "Log in", data ? "/dashboard" : "/signin"],
            ])
            .map(([l, h]) => (
              <Link key={h} href={h} onClick={() => setOpen(false)}>
                {l}
                <ArrowUpRight size={16} />
              </Link>
            ))}
        </nav>
      )}
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Logo />
          <p>
            A little closer to the cosmos.
            <br />A little closer to yourself.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span>EXPLORE</span>
            <Link href="/chart">Birth chart</Link>
            <Link href="/horoscopes">Daily readings</Link>
            <Link href="/compatibility">Compatibility</Link><Link href="/numerology">Life path & numbers</Link>
            <Link href="/sky">Today’s sky</Link>
          </div>
          <div>
            <span>DISCOVER</span>
            <Link href="/zodiac">Zodiac signs</Link>
            <Link href="/learn">Astrology library</Link>
            <Link href="/about">Our philosophy</Link>
            <Link href="/signup">Create an account</Link>
          </div>
          <div>
            <span>TAKE US WITH YOU</span>
            <PWAInstall />
            <p className="small">
              Free, always.
              <br />
              Made for curious minds.
            </p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Asteria. Written in the stars, grounded
          in you.
        </span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <LogoMark size={22} />
        </div>
      </div>
      <p className="disclaimer">
        Astrology is a symbolic practice for reflection and entertainment, not a
        scientifically validated prediction method.
      </p>
    </footer>
  );
}
