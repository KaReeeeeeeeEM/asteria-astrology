"use client";
import { useState } from "react";
import { numerology, numberMeanings } from "@/lib/explorations";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Field, FieldLabel, FieldDescription, FieldGroup } from "./ui/field";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { LearningFriends } from "./cartoons";
export function Numerology() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<ReturnType<typeof numerology> | null>(
    null,
  );
  const [error, setError] = useState("");
  return (
    <>
      <div className="numerology-layout">
        <div>
          <LearningFriends />
        </div>
        <form
          className="numerology-form"
          onSubmit={(e) => {
            e.preventDefault();
            try {
              setResult(numerology(date));
              setError("");
            } catch (e) {
              setError(e instanceof Error ? e.message : "Check your date");
              setResult(null);
            }
          }}
        >
          <h2>What’s your number?</h2>
          <p>
            Your birth date is all you need. This calculation stays in your
            browser.
          </p>
          <FieldGroup>
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="number-birth">Birth date</FieldLabel>
              <Input
                id="number-birth"
                type="date"
                min="1900-01-01"
                max={new Date().toISOString().slice(0, 10)}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                aria-invalid={!!error}
              />
              <FieldDescription>
                Life path, birthday number, and your current personal year.
              </FieldDescription>
            </Field>
            <Button type="submit" size="lg">
              Discover my numbers
            </Button>
          </FieldGroup>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Check your birth date</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </div>
      {result && (
        <section className="number-results" aria-live="polite">
          {[
            { label: "Life path", value: result.lifePath },
            { label: "Birthday number", value: result.birthday },
            {
              label: `Personal year · ${result.year}`,
              value: result.personalYear,
            },
          ].map((n) => (
            <Card key={n.label}>
              <CardHeader>
                <CardDescription>{n.label}</CardDescription>
                <div className="number-orb">{n.value}</div>
                <CardTitle>{numberMeanings[n.value].title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{numberMeanings[n.value].text}</p>
              </CardContent>
            </Card>
          ))}
          <p className="method-note">{result.steps}</p>
        </section>
      )}
      <p className="method-note">
        Pythagorean-style numerology: reduce the month, day, and year
        separately, preserving 11, 22, and 33, then reduce their sum. Other
        schools use different methods. Personal year uses the current UTC
        calendar year and reduces to 1–9. These are symbolic interpretations,
        not measurements of destiny.
      </p>
    </>
  );
}
