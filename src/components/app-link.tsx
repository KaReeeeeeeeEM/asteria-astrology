"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { useLanguage } from "./language";
const tools = [
  "numerology",
  "compatibility",
  "sky",
  "horoscopes",
  "learn",
  "zodiac",
  "privacy",
  "terms",
  "about",
];
export function dashboardHref(href: string, path: string) {
  if (!path.startsWith("/dashboard")) return href;
  if (href === "/chart") return "/dashboard/charts";
  const pathname = href.split(/[?#]/)[0];
  if (tools.some((p) => pathname === `/${p}` || pathname.startsWith(`/${p}/`)))
    return "/dashboard" + href;
  return href;
}
export default function AppLink(props: ComponentProps<typeof Link>) {
  const path = usePathname(),
    { t } = useLanguage();
  return (
    <Link
      {...props}
      href={
        typeof props.href === "string"
          ? dashboardHref(props.href, path)
          : props.href
      }
      aria-label={
        typeof props["aria-label"] === "string"
          ? t(props["aria-label"])
          : props["aria-label"]
      }
      title={props.title ? t(props.title) : undefined}
    />
  );
}
