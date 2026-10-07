"use client";
import { LocalizedDate } from "@/components/localized-date";

import { Text } from "@/components/language";

import { ZodiacMascot } from "./cartoons";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "@/components/app-link";
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
          <Text>
            <LocalizedDate value={new Date(date)} dateStyle="long" />
          </Text>
          <Text> </Text>
          <Text>{"· UTC"}</Text>
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
                  <Text>{s.symbol}</Text> <Text>{s.name}</Text>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="reading-hero" key={sign}>
        <ZodiacMascot sign={reading.sign.name} />
        <div>
          <span className="eyebrow">
            <Text>{reading.sign.name}</Text> ·{" "}
            <Text>{reading.sign.element}</Text>
          </span>
          <h2>
            <Text>{reading.title}</Text>
          </h2>
          <p>
            <Text>{reading.text}</Text>
          </p>
          <span className="small muted">
            <Text>{"Moon in "}</Text>
            <Text>{reading.moon.sign}</Text> · <Text>{reading.phaseName}</Text>
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
              <CardTitle>
                <Text>{x.title}</Text>
              </CardTitle>
              <CardDescription>
                <Text>{"A thoughtful moment for your day"}</Text>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                <Text>{x.text}</Text>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="inline-cta">
        <div>
          <h3>
            <Text>{"Make space for your own story."}</Text>
          </h3>
          <p>
            <Text>
              {
                "Save a chart and keep a private reflection journal in your dashboard."
              }
            </Text>
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/journal">
            <Text>{"Open your journal"}</Text>
            <ArrowUpRight data-icon="inline-end" />
          </Link>
        </Button>
      </div>
      <p className="method-note">
        <Text>
          {
            "These readings combine calculated Sun and Moon signs, lunar phase, the closest current sky aspect, and a solar-sign whole-sign reflection theme. Original rule-based text varies with the sky and UTC date. Themes use your chosen Sun sign, not your saved natal chart; they are symbolic reflections, not event forecasts."
          }
        </Text>
      </p>
    </>
  );
}
