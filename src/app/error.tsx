"use client";
import { Text } from "@/components/language";

import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="error-page">
      <span className="eyebrow">
        <Text>{"A MOMENT TO RESET"}</Text>
      </span>
      <h1>
        <Text>{"A little interruption"}</Text>
        <br />
        <em>
          <Text>{"in the orbit."}</Text>
        </em>
      </h1>
      <p>
        <Text>{"Something didn’t load. Please try again in a moment."}</Text>
      </p>
      <Button onClick={reset}>
        <Text>{"Try again"}</Text>
      </Button>
    </main>
  );
}
