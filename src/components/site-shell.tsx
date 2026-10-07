"use client";
import { LanguageSwitcher } from "./language";
import { Text, LocalizedElement } from "@/components/language";

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
                    <Text>{label}</Text>
                    <span className="nav-underline" aria-hidden="true" />
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="header-actions">
          <LanguageSwitcher compact />
          <ThemeToggle />
          <Link href={data ? "/dashboard" : "/signin"} className="signin-link">
            <Text>{data ? "My dashboard" : "Log in"}</Text>
          </Link>
          <Button asChild size="sm" className="header-primary-action">
            <Link href={data ? "/dashboard/charts" : "/signup"}>
              <Text>{data ? "My charts" : "Begin your journey"}</Text>
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
                <SheetTitle>
                  <Text>{"Your little universe"}</Text>
                </SheetTitle>
                <SheetDescription>
                  <Text>{"Follow your curiosity."}</Text>
                </SheetDescription>
              </SheetHeader>
              <LocalizedElement
                as="nav"
                className="sheet-navigation"
                aria-label="Mobile navigation"
              >
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
                      <Text>{label}</Text>
                      <span className="nav-underline" aria-hidden="true" />
                    </Link>
                  ))}
              </LocalizedElement>
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
            <Text>{"A little closer to the cosmos."}</Text>
            <br />
            <Text>{"A little closer to yourself."}</Text>
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span>
              <Text>{"EXPLORE"}</Text>
            </span>
            <Link href="/chart">
              <Text>{"Birth chart"}</Text>
            </Link>
            <Link href="/horoscopes">
              <Text>{"Daily readings"}</Text>
            </Link>
            <Link href="/compatibility">
              <Text>{"Compatibility"}</Text>
            </Link>
            <Link href="/numerology">
              <Text>{"Life path & numbers"}</Text>
            </Link>
            <Link href="/sky">
              <Text>{"Today’s sky"}</Text>
            </Link>
          </div>
          <div>
            <span>
              <Text>{"DISCOVER"}</Text>
            </span>
            <Link href="/zodiac">
              <Text>{"Zodiac signs"}</Text>
            </Link>
            <Link href="/learn">
              <Text>{"Astrology library"}</Text>
            </Link>
            <Link href="/about">
              <Text>{"Our philosophy"}</Text>
            </Link>
            <Link href="/signup">
              <Text>{"Create an account"}</Text>
            </Link>
          </div>
          <div>
            <span>
              <Text>{"TAKE US WITH YOU"}</Text>
            </span>
            <PWAInstall />
            <p className="small">
              <Text>{"Free, always."}</Text>
              <br />
              <Text>{"Made for curious minds."}</Text>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © <Text>{new Date().getFullYear()}</Text>
          <Text>{"Asteria. Written in the stars, grounded in you."}</Text>
        </span>
        <div>
          <Link href="/privacy">
            <Text>{"Privacy"}</Text>
          </Link>
          <Link href="/terms">
            <Text>{"Terms"}</Text>
          </Link>
          <LogoMark size={22} />
        </div>
      </div>
      <p className="disclaimer">
        <Text>
          {
            "Astrology is a symbolic practice for reflection and entertainment, not a scientifically validated prediction method."
          }
        </Text>
      </p>
    </footer>
  );
}
