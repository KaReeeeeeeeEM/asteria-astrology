"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
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
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = useMemo(
    () =>
      articles.filter(
        (a) =>
          (category === "All" || a.category === category) &&
          `${a.title} ${a.intro} ${a.sections.map((s) => s.text).join(" ")}`
            .toLowerCase()
            .includes(q.toLowerCase()),
      ),
    [q, category],
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
              {c}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <p className="small muted">
        {filtered.length} articles · Free to explore
      </p>
      <div className="library-grid">
        {filtered.map((a, i) => (
          <Link href={`/learn/${a.slug}`} key={a.slug} className="library-card">
            <div className="library-card-top">
              <span className="library-card-symbol">
                {a.category === "Planets"
                  ? "☉"
                  : a.category === "Aspects"
                    ? "△"
                    : a.category === "Houses"
                      ? "⌂"
                      : a.category === "Moon"
                        ? "☽"
                        : "✦"}
              </span>
              <span className="small muted">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <Badge variant="secondary">{a.category}</Badge>
            <h3>{a.title}</h3>
            <p>{a.intro}</p>
            <span className="article-read">
              {a.minutes} MIN READ <ArrowUpRight size={18} />
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
            <EmptyTitle>No articles found</EmptyTitle>
            <EmptyDescription>
              Try a different word or choose another category.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </>
  );
}
