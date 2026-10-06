"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Heart, Compass, NotebookPen } from "lucide-react";
import { signs } from "@/lib/knowledge";
import { dailyReading } from "@/lib/astrology";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "./ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
export function Horoscopes({ date }: { date: string }) {
  const search = useSearchParams();
  const initial =
    signs.find((s) => s.name.toLowerCase() === search.get("sign"))?.name ||
    "Aries";
  const [sign, setSign] = useState(initial);
  const reading = dailyReading(sign, new Date(date));
  return (
    <>
      <div className="tool-toolbar">
        <span className="eyebrow">
          {new Intl.DateTimeFormat("en", {
            dateStyle: "long",
            timeZone: "UTC",
          }).format(new Date(date))}{" "}
          · UTC
        </span>
        <Select value={sign} onValueChange={setSign}>
          <SelectTrigger
            className="sign-select"
            aria-label="Choose your zodiac sign"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {signs.map((s) => (
                <SelectItem value={s.name} key={s.name}>
                  {s.symbol} {s.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="reading-hero" key={sign}>
        <div className="reading-symbol">{reading.sign.symbol}</div>
        <div>
          <span className="eyebrow">
            {reading.sign.name} · {reading.sign.element}
          </span>
          <h2>{reading.title}</h2>
          <p>{reading.text}</p>
          <span className="small muted">
            Moon in {reading.moon.sign} · {reading.phaseName}
          </span>
        </div>
      </div>
      <div className="reading-grid">
        {[
          { icon: Heart, title: "Connection", text: reading.connection },
          { icon: Compass, title: "A small intention", text: reading.focus },
          {
            icon: NotebookPen,
            title: "A question to carry",
            text: reading.prompt,
          },
        ].map((x) => (
          <Card key={x.title}>
            <CardHeader>
              <x.icon strokeWidth={1} />
              <CardTitle>{x.title}</CardTitle>
              <CardDescription>
                A thoughtful moment for your day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{x.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="inline-cta">
        <div>
          <h3>Make space for your own story.</h3>
          <p>
            Save a chart and keep a private reflection journal in your
            dashboard.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/journal">
            Open your journal
            <ArrowUpRight data-icon="inline-end" />
          </Link>
        </Button>
      </div>
      <p className="method-note">
        These free readings combine the calculated Moon sign with original
        element-based prompts, using the UTC calendar day. They are symbolic
        reflections, not personalized event predictions.
      </p>
    </>
  );
}
