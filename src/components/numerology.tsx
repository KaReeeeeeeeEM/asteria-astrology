"use client";
import { Text } from "@/components/language";

import Link from "@/components/app-link";
import { NumerologyReport } from "./numerology-report";
import { useState, useRef, useEffect } from "react";
import { animate } from "animejs";
import { ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";
import { numerology } from "@/lib/explorations";
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
        <Badge variant="outline">
          <Text>{"STEP "}</Text>
          <Text>{step + 1}</Text>
          <Text>{"OF 3"}</Text>
        </Badge>
        <Progress
          value={((step + 1) / 3) * 100}
          aria-label="Numerology journey progress"
        />
        <span>
          <Text>{["Say hello", "Your birthday", "Your numbers"][step]}</Text>
        </span>
      </div>
      <div className="step-panel" ref={root}>
        {step === 0 && (
          <div className="numerology-layout">
            <LearningFriends />
            <Card>
              <CardHeader>
                <CardDescription>
                  <Text>{"A LITTLE NUMBER MAGIC"}</Text>
                </CardDescription>
                <CardTitle>
                  <h2>
                    <Text>{"A birthday. A beginning."}</Text>
                  </h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <Text>
                    {
                      "Meet your life path, birthday number, and personal year. You bring a date; we’ll show every step."
                    }
                  </Text>
                </p>
                <Typewriter text="No account needed. Just a birthday and a little curiosity." />
                <p className="method-note">
                  <Text>{"Learning to give readings? Start with the "}</Text>
                  <Link href="/learn/numerology-readers-handbook">
                    <Text>{"reader’s handbook"}</Text>
                  </Link>
                  <Text>{", then use your own results to practice."}</Text>
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setStep(1)}>
                  <Text>{"Let’s begin"}</Text>
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
                  <h2>
                    <Text>{"When did your story begin?"}</Text>
                  </h2>
                </CardTitle>
                <CardDescription>
                  <Text>{"Your date stays in your browser."}</Text>
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
                      <FieldLabel htmlFor="number-birth">
                        <Text>{"Birth date"}</Text>
                      </FieldLabel>
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
                        <Text>{"Type YYYY-MM-DD, or open the calendar."}</Text>
                      </FieldDescription>
                    </Field>
                    {error && (
                      <Alert variant="destructive">
                        <AlertTitle>
                          <Text>{"Check your birth date"}</Text>
                        </AlertTitle>
                        <AlertDescription>
                          <Text>{error}</Text>
                        </AlertDescription>
                      </Alert>
                    )}
                  </FieldGroup>
                </form>
              </CardContent>
              <CardFooter className="step-actions">
                <Button variant="ghost" onClick={() => setStep(0)}>
                  <ArrowLeft data-icon="inline-start" />
                  <Text>{"Back"}</Text>
                </Button>
                <Button type="submit" form="number-form">
                  <Text>{"Discover my numbers"}</Text>
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
                <Text>{"Try another birthday"}</Text>
              </Button>
            </div>
            <NumerologyReport
              key={date}
              date={date}
              result={result}
              onYearChange={(year) => setResult(numerology(date, year))}
            />
          </section>
        )}
      </div>
      <p className="method-note">
        <Text>
          {
            "Pythagorean-style numerology: reduce month, day, and year separately, preserving 11, 22, and 33, then reduce their sum. Other schools use different methods. Personal year uses the current UTC calendar year and reduces to 1–9. These are symbolic interpretations."
          }
        </Text>
      </p>
    </>
  );
}
