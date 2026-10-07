"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Download, BookOpen } from 'lucide-react';
import { numerology, numberMeanings } from '@/lib/explorations';
import { numberProfiles, buildNumerologyReading, numerologyReportMarkdown } from '@/lib/numerology-readings';
import { readingLessons } from '@/lib/reader-lessons';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Field, FieldGroup, FieldLabel, FieldDescription } from './ui/field';
import { Textarea } from './ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from './ui/select';

export function NumerologyReport({ date, result, onYearChange }: { date: string; result: ReturnType<typeof numerology>; onYearChange: (year: number) => void }) {
  const [notes, setNotes] = useState('');
  const { sections, synthesis } = buildNumerologyReading(result);
  const currentYear = new Date().getUTCFullYear();
  function download() {
    const url = URL.createObjectURL(new Blob([numerologyReportMarkdown(date, result, notes)], {type:'text/markdown;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url; link.download = `asteria-numerology-${date}-${result.year}.md`; link.click();
    setTimeout(()=>URL.revokeObjectURL(url), 1000);
  }
  return <div className="numerology-report">
    <div className="reading-toolbar">
      <div><Badge variant="outline">THE READER’S DESK</Badge><h2>Your reading, in depth.</h2><p>Understand each number, connect its role, and learn how to conduct a reading.</p></div>
      <Button variant="outline" onClick={download}><Download data-icon="inline-start"/>Download reading</Button>
    </div>
    <Tabs defaultValue="reading">
      <TabsList aria-label="Numerology reading and study"><TabsTrigger value="reading">Your reading</TabsTrigger><TabsTrigger value="practice">Reader’s handbook</TabsTrigger><TabsTrigger value="reference">Number reference</TabsTrigger></TabsList>
      <TabsContent value="reading">
        <div className="number-results">
          {sections.map(section=><Card key={section.label} className="reading-detail-card">
            <CardHeader><CardDescription>{section.label}</CardDescription><div className="number-orb">{section.number}</div><CardTitle><h3>{section.title}</h3></CardTitle></CardHeader>
            <CardContent className="reading-prose"><p className="reading-role">{section.introduction}</p>{section.paragraphs.map(p=><p key={p}>{p}</p>)}{section.details.map(detail=><section key={detail.title}><h4>{detail.title}</h4><p>{detail.text}</p></section>)}</CardContent>
          </Card>)}
          <Card className="reading-detail-card"><CardHeader><CardDescription>THE WHOLE PICTURE</CardDescription><CardTitle><h3>Read your numbers together.</h3></CardTitle></CardHeader><CardContent className="reading-prose">{synthesis.map(p=><p key={p}>{p}</p>)}<section><h4>Try this in a session</h4><p>Ask the person for one situation they want to understand. Identify the broad life-path theme, one birthday resource and the year’s focus. Ask where the interpretation fits, where it does not, and what small action would be useful. Their experience determines which parts of the reading deserve attention.</p></section></CardContent><CardFooter><Button asChild variant="outline"><Link href="/learn/numerology-readers-handbook"><BookOpen data-icon="inline-start"/>Study the reading method</Link></Button></CardFooter></Card>
        </div>
        <Card className="reading-workbench"><CardHeader><CardDescription>FOLLOW THE REASONING</CardDescription><CardTitle><h3>Calculation & session notes</h3></CardTitle></CardHeader><CardContent className="reading-prose">
          <p>{result.steps}</p><p>Birthday talent uses the day alone. Personal year combines the birth month, birth day and selected calendar year, reducing fully to 1–9. It changes with the calendar, while life path and birthday stay the same.</p>
          <FieldGroup><Field><FieldLabel htmlFor="reading-year">Year to explore</FieldLabel><Select value={String(result.year)} onValueChange={v=>onYearChange(Number(v))}><SelectTrigger id="reading-year"><SelectValue/></SelectTrigger><SelectContent><SelectGroup>{Array.from({length:10},(_,i)=>currentYear-1+i).map(y=><SelectItem value={String(y)} key={y}>{y}</SelectItem>)}</SelectGroup></SelectContent></Select><FieldDescription>Explore the cycle without changing your birth-date numbers.</FieldDescription></Field>
          <Field><FieldLabel htmlFor="reading-notes">Your reading notes</FieldLabel><Textarea id="reading-notes" rows={6} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="The question • Examples that fit • Examples that do not • A useful next step"/><FieldDescription>Notes stay in this open reading and are included in the download. Download before trying another birthday or leaving; notes are not saved to your account.</FieldDescription></Field></FieldGroup>
        </CardContent><CardFooter><Button onClick={download}><Download data-icon="inline-start"/>Download reading & notes</Button></CardFooter></Card>
      </TabsContent>
      <TabsContent value="practice"><Card><CardHeader><CardDescription>LEARN TO READ, STEP BY STEP</CardDescription><CardTitle><h3>The reader’s handbook</h3></CardTitle><p>Learn the arithmetic, distinguish the roles, and practice a complete conversation. Open each lesson for a worked exercise.</p></CardHeader><CardContent><Accordion type="multiple" defaultValue={[readingLessons[0].title]}>{readingLessons.map(lesson=><AccordionItem value={lesson.title} key={lesson.title}><AccordionTrigger>{lesson.title}</AccordionTrigger><AccordionContent className="reading-prose"><p>{lesson.text}</p><h4>Practice exercise</h4><p>{lesson.exercise}</p></AccordionContent></AccordionItem>)}</Accordion></CardContent><CardFooter><Button asChild variant="outline"><Link href="/learn/numerology-readers-handbook">Open the full handbook</Link></Button></CardFooter></Card></TabsContent>
      <TabsContent value="reference"><Card><CardHeader><CardDescription>KEEP A REFERENCE AT HAND</CardDescription><CardTitle><h3>The twelve number archetypes</h3></CardTitle><p>Study 1–9 and master numbers 11, 22 and 33. Expand a number to compare its meaning with your own results.</p></CardHeader><CardContent><Accordion type="multiple" defaultValue={[String(result.lifePath)]}>{Object.entries(numberProfiles).map(([n,profile])=><AccordionItem value={n} key={n}><AccordionTrigger>{n} · {numberMeanings[Number(n)].title}</AccordionTrigger><AccordionContent className="reading-prose"><p>{profile.overview}</p>{[['Strengths',profile.strengths],['Growth',profile.growth],['Relationships',profile.relationships],['Work and contribution',profile.work],['Practice',profile.practice],['Reading question',profile.question]].map(([title,text])=><section key={title}><h4>{title}</h4><p>{text}</p></section>)}</AccordionContent></AccordionItem>)}</Accordion></CardContent></Card></TabsContent>
    </Tabs>
    <p className="method-note">Original Asteria interpretations for symbolic reflection. Method references and further study: <a href="https://www.numerology.com/articles/your-numerology-chart/life-path-number-calculator/" target="_blank" rel="noreferrer">Numerology.com’s life-path guide</a> and <a href="https://www.worldnumerology.com/hans-decoz-school-of-numerology/numerology-course-curriculum.html" target="_blank" rel="noreferrer">World Numerology’s curriculum</a>. Traditions differ; a reading is a framework for conversation, not evidence of future events.</p>
  </div>;
}
