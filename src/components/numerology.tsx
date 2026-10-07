"use client";
import { useState, useRef, useEffect } from "react";
import { animate } from "animejs";
import { ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";
import { numerology, numberMeanings } from "@/lib/explorations";
import { Button } from "./ui/button";
import { DatePicker } from "./date-picker";
import { Field, FieldLabel, FieldDescription, FieldGroup } from "./ui/field";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { LearningFriends } from "./cartoons";
import { Typewriter } from "./typewriter";
export function Numerology() {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState("");
  const [result, setResult] = useState<ReturnType<typeof numerology> | null>(
    null,
  );
  const [error, setError] = useState("");
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const a = animate(root.current, {
      opacity: [0, 1],
      translateX: [25, 0],
      duration: 550,
      ease: "out(3)",
    });
    return () => {
      a.revert();
    };
  }, [step]);
  return (
    <>
      <div className="journey-progress">
        <Badge variant="outline">STEP {step + 1} OF 3</Badge>
        <Progress
          value={((step + 1) / 3) * 100}
          aria-label="Numerology journey progress"
        />
        <span>{["Say hello", "Your birthday", "Your numbers"][step]}</span>
      </div>
      <div className="step-panel" ref={root}>
        {step === 0 && (
          <div className="numerology-layout">
            <LearningFriends />
            <Card>
              <CardHeader>
                <CardDescription>A LITTLE NUMBER MAGIC</CardDescription>
                <CardTitle>
                  <h2>A birthday. A beginning.</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Meet your life path, birthday number, and personal year. You
                  bring a date; we’ll show every step.
                </p>
                <Typewriter text="No account needed. Just a birthday and a little curiosity." />
              </CardContent>
              <CardFooter>
                <Button onClick={() => setStep(1)}>
                  Let’s begin
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
        {step === 1 && (
          <div className="numerology-layout">
            <LearningFriends />
            <Card>
              <CardHeader>
                <CardTitle>
                  <h2>When did your story begin?</h2>
                </CardTitle>
                <CardDescription>
                  Your date stays in your browser.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  id="number-form"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    try {
                      setResult(numerology(date));
                      setError("");
                      setStep(2);
                    } catch (e) {
                      setError(
                        e instanceof Error ? e.message : "Check your date",
                      );
                    }
                  }}
                >
                  <FieldGroup>
                    <Field data-invalid={!!error}>
                      <FieldLabel htmlFor="number-birth">Birth date</FieldLabel>
                      <DatePicker
                        id="number-birth"
                        value={date}
                        invalid={!!error}
                        onChange={(v) => {
                          setDate(v);
                          setError("");
                        }}
                      />
                      <FieldDescription>
                        Type YYYY-MM-DD, or open the calendar.
                      </FieldDescription>
                    </Field>
                    {error && (
                      <Alert variant="destructive">
                        <AlertTitle>Check your birth date</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                  </FieldGroup>
                </form>
              </CardContent>
              <CardFooter className="step-actions">
                <Button variant="ghost" onClick={() => setStep(0)}>
                  <ArrowLeft data-icon="inline-start" />
                  Back
                </Button>
                <Button type="submit" form="number-form">
                  Discover my numbers
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
        {step === 2 && result && (
          <section aria-live="polite">
            <div className="result-intro">
              <Typewriter text="A little number magic, made just for your birthday." />
              <Button variant="outline" onClick={() => setStep(1)}>
                <RotateCcw data-icon="inline-start" />
                Try another birthday
              </Button>
            </div>
            <div className="number-results">
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
            </div>
          </section>
        )}
      </div>
      <p className="method-note">
        Pythagorean-style numerology: reduce month, day, and year separately,
        preserving 11, 22, and 33, then reduce their sum. Other schools use
        different methods. Personal year uses the current UTC calendar year and
        reduces to 1–9. These are symbolic interpretations.
      </p>
    </>
  );
}
