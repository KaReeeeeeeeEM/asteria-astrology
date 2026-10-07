"use client";
import { Text, useLanguage } from "@/components/language";

import { useState } from "react";
import Link from "@/components/app-link";
import { Download, BookOpen } from "lucide-react";
import { numerology, numberMeanings } from "@/lib/explorations";
import {
  numberProfiles,
  buildNumerologyReading,
  numerologyReportMarkdown,
} from "@/lib/numerology-readings";
import { readingLessons } from "@/lib/reader-lessons";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "./ui/field";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "./ui/select";

export function NumerologyReport({
  date,
  result,
  onYearChange,
}: {
  date: string;
  result: ReturnType<typeof numerology>;
  onYearChange: (year: number) => void;
}) {
  const { t } = useLanguage();
  const [notes, setNotes] = useState("");
  const { sections, synthesis } = buildNumerologyReading(result);
  const currentYear = new Date().getUTCFullYear();
  function download() {
    const url = URL.createObjectURL(
      new Blob([numerologyReportMarkdown(date, result, notes, t)], {
        type: "text/markdown;charset=utf-8",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `asteria-numerology-${date}-${result.year}.md`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className="numerology-report">
      <div className="reading-toolbar">
        <div>
          <Badge variant="outline">
            <Text>{"THE READER’S DESK"}</Text>
          </Badge>
          <h2>
            <Text>{"Your reading, in depth."}</Text>
          </h2>
          <p>
            <Text>
              {
                "Understand each number, connect its role, and learn how to conduct a reading."
              }
            </Text>
          </p>
        </div>
        <Button variant="outline" onClick={download}>
          <Download data-icon="inline-start" />
          <Text>{"Download reading"}</Text>
        </Button>
      </div>
      <Tabs defaultValue="reading">
        <TabsList aria-label="Numerology reading and study">
          <TabsTrigger value="reading">
            <Text>{"Your reading"}</Text>
          </TabsTrigger>
          <TabsTrigger value="practice">
            <Text>{"Reader’s handbook"}</Text>
          </TabsTrigger>
          <TabsTrigger value="reference">
            <Text>{"Number reference"}</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="reading">
          <div className="number-results">
            {sections.map((section) => (
              <Card key={section.label} className="reading-detail-card">
                <CardHeader>
                  <CardDescription>
                    <Text>{section.label}</Text>
                  </CardDescription>
                  <div className="number-orb">
                    <Text>{section.number}</Text>
                  </div>
                  <CardTitle>
                    <h3>
                      <Text>{section.title}</Text>
                    </h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="reading-prose">
                  <p className="reading-role">
                    <Text>{section.introduction}</Text>
                  </p>
                  {section.paragraphs.map((p) => (
                    <p key={p}>
                      <Text>{p}</Text>
                    </p>
                  ))}
                  {section.details.map((detail) => (
                    <section key={detail.title}>
                      <h4>
                        <Text>{detail.title}</Text>
                      </h4>
                      <p>
                        <Text>{detail.text}</Text>
                      </p>
                    </section>
                  ))}
                </CardContent>
              </Card>
            ))}
            <Card className="reading-detail-card">
              <CardHeader>
                <CardDescription>
                  <Text>{"THE WHOLE PICTURE"}</Text>
                </CardDescription>
                <CardTitle>
                  <h3>
                    <Text>{"Read your numbers together."}</Text>
                  </h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="reading-prose">
                {synthesis.map((p) => (
                  <p key={p}>
                    <Text>{p}</Text>
                  </p>
                ))}
                <section>
                  <h4>
                    <Text>{"Try this in a session"}</Text>
                  </h4>
                  <p>
                    <Text>
                      {
                        "Ask the person for one situation they want to understand. Identify the broad life-path theme, one birthday resource and the year’s focus. Ask where the interpretation fits, where it does not, and what small action would be useful. Their experience determines which parts of the reading deserve attention."
                      }
                    </Text>
                  </p>
                </section>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline">
                  <Link href="/learn/numerology-readers-handbook">
                    <BookOpen data-icon="inline-start" />
                    <Text>{"Study the reading method"}</Text>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <Card className="reading-workbench">
            <CardHeader>
              <CardDescription>
                <Text>{"FOLLOW THE REASONING"}</Text>
              </CardDescription>
              <CardTitle>
                <h3>
                  <Text>{"Calculation & session notes"}</Text>
                </h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="reading-prose">
              <p>
                <Text>{result.steps}</Text>
              </p>
              <p>
                <Text>
                  {
                    "Birthday talent uses the day alone. Personal year combines the birth month, birth day and selected calendar year, reducing fully to 1–9. It changes with the calendar, while life path and birthday stay the same."
                  }
                </Text>
              </p>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="reading-year">
                    <Text>{"Year to explore"}</Text>
                  </FieldLabel>
                  <Select
                    value={String(result.year)}
                    onValueChange={(v) => onYearChange(Number(v))}
                  >
                    <SelectTrigger id="reading-year">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Array.from(
                          { length: 10 },
                          (_, i) => currentYear - 1 + i,
                        ).map((y) => (
                          <SelectItem value={String(y)} key={y}>
                            <Text>{y}</Text>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    <Text>
                      {
                        "Explore the cycle without changing your birth-date numbers."
                      }
                    </Text>
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="reading-notes">
                    <Text>{"Your reading notes"}</Text>
                  </FieldLabel>
                  <Textarea
                    id="reading-notes"
                    rows={6}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="The question • Examples that fit • Examples that do not • A useful next step"
                  />
                  <FieldDescription>
                    <Text>
                      {
                        "Notes stay in this open reading and are included in the download. Download before trying another birthday or leaving; notes are not saved to your account."
                      }
                    </Text>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </CardContent>
            <CardFooter>
              <Button onClick={download}>
                <Download data-icon="inline-start" />
                <Text>{"Download reading & notes"}</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardDescription>
                <Text>{"LEARN TO READ, STEP BY STEP"}</Text>
              </CardDescription>
              <CardTitle>
                <h3>
                  <Text>{"The reader’s handbook"}</Text>
                </h3>
              </CardTitle>
              <p>
                <Text>
                  {
                    "Learn the arithmetic, distinguish the roles, and practice a complete conversation. Open each lesson for a worked exercise."
                  }
                </Text>
              </p>
            </CardHeader>
            <CardContent>
              <Accordion
                type="multiple"
                defaultValue={[readingLessons[0].title]}
              >
                {readingLessons.map((lesson) => (
                  <AccordionItem value={lesson.title} key={lesson.title}>
                    <AccordionTrigger>
                      <Text>{lesson.title}</Text>
                    </AccordionTrigger>
                    <AccordionContent className="reading-prose">
                      <p>
                        <Text>{lesson.text}</Text>
                      </p>
                      <h4>
                        <Text>{"Practice exercise"}</Text>
                      </h4>
                      <p>
                        <Text>{lesson.exercise}</Text>
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <Link href="/learn/numerology-readers-handbook">
                  <Text>{"Open the full handbook"}</Text>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="reference">
          <Card>
            <CardHeader>
              <CardDescription>
                <Text>{"KEEP A REFERENCE AT HAND"}</Text>
              </CardDescription>
              <CardTitle>
                <h3>
                  <Text>{"The twelve number archetypes"}</Text>
                </h3>
              </CardTitle>
              <p>
                <Text>
                  {
                    "Study 1–9 and master numbers 11, 22 and 33. Expand a number to compare its meaning with your own results."
                  }
                </Text>
              </p>
            </CardHeader>
            <CardContent>
              <Accordion
                type="multiple"
                defaultValue={[String(result.lifePath)]}
              >
                {Object.entries(numberProfiles).map(([n, profile]) => (
                  <AccordionItem value={n} key={n}>
                    <AccordionTrigger>
                      {n} · <Text>{numberMeanings[Number(n)].title}</Text>
                    </AccordionTrigger>
                    <AccordionContent className="reading-prose">
                      <p>
                        <Text>{profile.overview}</Text>
                      </p>
                      {[
                        ["Strengths", profile.strengths],
                        ["Growth", profile.growth],
                        ["Relationships", profile.relationships],
                        ["Work and contribution", profile.work],
                        ["Practice", profile.practice],
                        ["Reading question", profile.question],
                      ].map(([title, text]) => (
                        <section key={title}>
                          <h4>
                            <Text>{title}</Text>
                          </h4>
                          <p>
                            <Text>{text}</Text>
                          </p>
                        </section>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <p className="method-note">
        <Text>
          {
            "Original Asteria interpretations for symbolic reflection. Method references and further study: "
          }
        </Text>
        <a
          href="https://www.numerology.com/articles/your-numerology-chart/life-path-number-calculator/"
          target="_blank"
          rel="noreferrer"
        >
          <Text>{"Numerology.com’s life-path guide"}</Text>
        </a>
        <Text>{"and "}</Text>
        <a
          href="https://www.worldnumerology.com/hans-decoz-school-of-numerology/numerology-course-curriculum.html"
          target="_blank"
          rel="noreferrer"
        >
          <Text>{"World Numerology’s curriculum"}</Text>
        </a>
        <Text>
          {
            ". Traditions differ; a reading is a framework for conversation, not evidence of future events."
          }
        </Text>
      </p>
    </div>
  );
}
