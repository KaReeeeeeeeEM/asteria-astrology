"use client";
import { Text, useLanguage } from "@/components/language";

import { useMemo, useState } from "react";
import Link from "@/components/app-link";
import { Search, ArrowUpRight, BookOpen } from "lucide-react";
import { articles, categories } from "@/lib/knowledge";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "./ui/empty";
export function Library() {
  const { t } = useLanguage();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = useMemo(
    () =>
      articles.filter(
        (a) =>
          (category === "All" || a.category === category) &&
          `${a.title} ${a.intro} ${a.sections.map((s) => s.text).join(" ")} ${t(a.title)} ${t(a.intro)} ${a.sections.map((s) => t(s.text)).join(" ")}`
            .toLowerCase()
            .includes(q.toLowerCase()),
      ),
    [q, category, t],
  );
  return (
    <>
      <div className="library-controls">
        <div className="search-field">
          <Search size={18} />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search signs, planets, aspects…"
            aria-label="Search the astrology library"
          />
        </div>
        <ToggleGroup
          type="single"
          value={category}
          onValueChange={(v) => v && setCategory(v)}
          aria-label="Library category"
          className="category-tabs"
        >
          {categories.map((c) => (
            <ToggleGroupItem value={c} key={c}>
              <Text>{c}</Text>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <p className="small muted">
        <Text>{filtered.length}</Text>
        <Text>{"articles · Free to explore"}</Text>
      </p>
      <div className="library-grid">
        {filtered.map((a, i) => (
          <Link href={`/learn/${a.slug}`} key={a.slug} className="library-card">
            <div className="library-card-top">
              <span className="library-card-symbol">
                <Text>
                  {a.category === "Planets"
                    ? "☉"
                    : a.category === "Aspects"
                      ? "△"
                      : a.category === "Houses"
                        ? "⌂"
                        : a.category === "Moon"
                          ? "☽"
                          : "✦"}
                </Text>
              </span>
              <span className="small muted">
                <Text>{String(i + 1).padStart(2, "0")}</Text>
              </span>
            </div>
            <Badge variant="secondary">
              <Text>{a.category}</Text>
            </Badge>
            <h3>
              <Text>{a.title}</Text>
            </h3>
            <p>
              <Text>{a.intro}</Text>
            </p>
            <span className="article-read">
              <Text>{a.minutes}</Text>
              <Text>{"MIN READ "}</Text>
              <ArrowUpRight size={18} />
            </span>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BookOpen />
            </EmptyMedia>
            <EmptyTitle>
              <Text>{"No articles found"}</Text>
            </EmptyTitle>
            <EmptyDescription>
              <Text>{"Try a different word or choose another category."}</Text>
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </>
  );
}
