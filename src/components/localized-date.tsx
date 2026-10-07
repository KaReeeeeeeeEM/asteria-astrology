"use client";
import { useLanguage } from "./language";
export function LocalizedDate({
  value,
  dateStyle = "medium",
  timeStyle,
  timeZone = "UTC",
}: {
  value: string | Date;
  dateStyle?: Intl.DateTimeFormatOptions["dateStyle"];
  timeStyle?: Intl.DateTimeFormatOptions["timeStyle"];
  timeZone?: string;
}) {
  const { language } = useLanguage();
  return (
    <>
      {new Intl.DateTimeFormat(language === "sw" ? "sw-TZ" : "en", {
        dateStyle,
        timeStyle,
        timeZone,
      }).format(new Date(value))}
    </>
  );
}
