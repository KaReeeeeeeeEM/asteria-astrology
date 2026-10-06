"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="error-page">
      <span className="eyebrow">A MOMENT TO RESET</span>
      <h1>
        A little interruption
        <br />
        <em>in the orbit.</em>
      </h1>
      <p>Something didn’t load. Please try again in a moment.</p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
