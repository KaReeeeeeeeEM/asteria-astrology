"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { Logo, LogoMark } from "./logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
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
        <NavigationMenu className="desktop-nav" aria-label="Main navigation">
          <NavigationMenuList>
            {links.map(([label, href]) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink asChild active={path.startsWith(href)}>
                  <Link
                    href={href}
                    className="nav-link"
                    aria-current={path.startsWith(href) ? "page" : undefined}
                    data-active={path.startsWith(href)}
                  >
                    {label}
                    <span className="nav-underline" aria-hidden="true" />
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="header-actions">
          <ThemeToggle />
          <Link href={data ? "/dashboard" : "/signin"} className="signin-link">
            {data ? "My dashboard" : "Log in"}
          </Link>
          <Button asChild size="sm" className="header-primary-action">
            <Link href={data ? "/dashboard/charts" : "/signup"}>
              {data ? "My charts" : "Begin your journey"}
              <ArrowUpRight data-icon="inline-end" />
            </Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mobile-menu"
                aria-label="Open navigation"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your little universe</SheetTitle>
                <SheetDescription>Follow your curiosity.</SheetDescription>
              </SheetHeader>
              <nav className="sheet-navigation" aria-label="Mobile navigation">
                {links
                  .concat([
                    ["Birth chart", "/chart"],
                    ["Daily readings", "/horoscopes"],
                    ["Compatibility", "/compatibility"],
                    ...(data ? [] : [["Create account", "/signup"]]),
                    [
                      data ? "Dashboard" : "Log in",
                      data ? "/dashboard" : "/signin",
                    ],
                  ])
                  .map(([label, href]) => (
                    <Link
                      className="nav-link"
                      href={href}
                      key={href}
                      data-active={path.startsWith(href)}
                      aria-current={path.startsWith(href) ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {label}
                      <span className="nav-underline" aria-hidden="true" />
                    </Link>
                  ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
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
            <Link href="/compatibility">Compatibility</Link>
            <Link href="/numerology">Life path & numbers</Link>
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
