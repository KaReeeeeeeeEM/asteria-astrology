"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Typewriter } from "./typewriter";
import { zodiacMatch } from "@/lib/explorations";
import { ZodiacMascot } from "./cartoons";
import { useState } from "react";
import { signs } from "@/lib/knowledge";
import {
  aspectsBetween,
  calculateChart,
  aspectReading,
  type Chart,
} from "@/lib/astrology";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "./ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Button } from "./ui/button";
import { BirthForm } from "./chart-tool";
import { ArrowRight, Heart } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
export function Compatibility() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState("Aries");
  const [b, setB] = useState("Libra");
  const [one, setOne] = useState<Chart | null>(null);
  const [two, setTwo] = useState<Chart | null>(null);
  const s1 = signs.find((s) => s.name === a)!;
  const s2 = signs.find((s) => s.name === b)!;
  const match = zodiacMatch(a, b);
  const same = s1.element === s2.element;
  const harmonious =
    [s1.element, s2.element].every((e) => ["Fire", "Air"].includes(e)) ||
    [s1.element, s2.element].every((e) => ["Earth", "Water"].includes(e));
  const aspects =
    one && two ? aspectsBetween(one.placements, two.placements, 3) : [];
  return (
    <Tabs defaultValue="signs">
      <TabsList>
        <TabsTrigger value="signs">Sign connection</TabsTrigger>
        <TabsTrigger value="charts">Two-chart synastry</TabsTrigger>
      </TabsList>
      <TabsContent value="signs">
        <div className="journey-progress">
          <Progress
            value={((step + 1) / 3) * 100}
            aria-label="Connection journey progress"
          />
          <span>STEP {step + 1} OF 3</span>
        </div>
        {step === 0 && (
          <Card className="connection-welcome">
            <CardHeader>
              <CardTitle>
                <h2>Two signs. A little spark.</h2>
              </CardTitle>
              <CardDescription>
                Get curious about your cosmic connection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="connection-art">
                <ZodiacMascot sign="Aries" />
                <Heart />
                <ZodiacMascot sign="Libra" />
              </div>
              <Typewriter text="Pick two signs. We’ll show the score and what goes into it." />
            </CardContent>
            <CardFooter>
              <Button onClick={() => setStep(1)}>
                Choose our signs
                <ArrowRight data-icon="inline-end" />
              </Button>
            </CardFooter>
          </Card>
        )}
        {step === 1 && (
          <section className="step-panel">
            <div className="compatibility-selectors">
              {[
                { v: a, set: setA, label: "Your sign" },
                { v: b, set: setB, label: "Their sign" },
              ].map((s) => (
                <div key={s.label}>
                  <label className="eyebrow">{s.label}</label>
                  <Select value={s.v} onValueChange={s.set}>
                    <SelectTrigger aria-label={s.label}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {signs.map((x) => (
                          <SelectItem key={x.name} value={x.name}>
                            {x.symbol} {x.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
            <div className="step-actions">
              <Button variant="ghost" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button onClick={() => setStep(2)}>
                Reveal our connection
                <Heart data-icon="inline-end" />
              </Button>
            </div>
          </section>
        )}
        {step === 2 && (
          <section className="step-panel">
            <Button variant="outline" onClick={() => setStep(1)}>
              Change our signs
            </Button>
            <div className="connection-art">
              <ZodiacMascot sign={s1.name} />
              <Heart strokeWidth={0.6} />
              <ZodiacMascot sign={s2.name} />
            </div>
            <div className="match-result" aria-live="polite">
              <div className="match-percent">
                <strong>{match.percentage}%</strong>
                <span>Symbolic match</span>
              </div>
              <div className="match-breakdown">
                {match.scores.map((x) => (
                  <div key={x.label}>
                    <span>
                      {x.label} · {x.weight}% weight
                    </span>
                    <strong>{x.value}%</strong>
                    <div className="match-track">
                      <i style={{ width: `${x.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="connection-reading">
              <span className="eyebrow">
                {s1.element} MEETS {s2.element}
              </span>
              <h2>
                {same
                  ? "A familiar kind of magic."
                  : harmonious
                    ? "A spark of understanding."
                    : "A different kind of possibility."}
              </h2>
              <p>
                {same
                  ? `${s1.name} and ${s2.name} share the ${s1.element.toLowerCase()} element, suggesting a familiar symbolic language. Familiarity can support understanding, while differences in modality invite new approaches.`
                  : harmonious
                    ? `${s1.name} brings ${s1.gift.toLowerCase()}, while ${s2.name} brings ${s2.gift.toLowerCase()}. Your elements are traditionally considered complementary—a starting point for noticing how you encourage one another.`
                    : `${s1.name} and ${s2.name} approach life through different elements. The contrast between ${s1.gift.toLowerCase()} and ${s2.gift.toLowerCase()} can become a useful conversation about needs and perspective.`}
              </p>
              <div className="connection-prompts">
                <div>
                  <h3>A place to connect</h3>
                  <p>
                    Ask each other: “When do you feel most supported?” Let{" "}
                    {s1.gift.toLowerCase()} and {s2.gift.toLowerCase()} shape
                    how you listen.
                  </p>
                </div>
                <div>
                  <h3>Room to grow</h3>
                  <p>
                    Practice {s1.growth.toLowerCase()} and{" "}
                    {s2.growth.toLowerCase()}. A chart cannot replace consent,
                    kindness, or honest communication.
                  </p>
                </div>
              </div>
              <p className="method-note">
                This playful score combines elemental flow (55%), sign geometry
                (30%), and modality (15%). It is a designed symbolic scale, not
                a measured probability of relationship success. Explore
                two-chart synastry for more detail.
              </p>
            </div>
          </section>
        )}
      </TabsContent>
      <TabsContent value="charts">
        <div className="synastry-intro">
          <h2>A conversation between two skies.</h2>
          <p>
            Enter birth details with the other person’s permission. Calculations
            remain in your browser.
          </p>
        </div>
        <div className="synastry-forms">
          <section>
            <h3>
              {one ? `${one.input.name}’s chart is ready` : "First person"}
            </h3>
            {one ? (
              <Button variant="outline" onClick={() => setOne(null)}>
                Edit first chart
              </Button>
            ) : (
              <BirthForm
                onCalculate={(i) => setOne(calculateChart(i))}
                label="Calculate first chart"
              />
            )}
          </section>
          <section>
            <h3>
              {two ? `${two.input.name}’s chart is ready` : "Second person"}
            </h3>
            {two ? (
              <Button variant="outline" onClick={() => setTwo(null)}>
                Edit second chart
              </Button>
            ) : (
              <BirthForm
                onCalculate={(i) => setTwo(calculateChart(i))}
                label="Calculate second chart"
              />
            )}
          </section>
        </div>
        {one && two && (
          <section className="synastry-results">
            <h2>
              {one.input.name} <ArrowRight size={24} /> {two.input.name}
            </h2>
            <p className="muted">
              {aspects.length} cross-chart longitude aspects within a 3° orb.
              First planet belongs to {one.input.name}; second to{" "}
              {two.input.name}.
            </p>
            <div className="aspect-grid">
              {aspects.map((x) => (
                <div className="aspect-item" key={`${x.a}-${x.b}`}>
                  <h3>
                    {x.a} {x.name.toLowerCase()} {x.b}
                  </h3>
                  <span className="eyebrow">
                    {x.orb.toFixed(1)}° ORB · {x.tone}
                  </span>
                  <p>{aspectReading(x)}</p>
                </div>
              ))}
            </div>
            {!aspects.length && (
              <Alert>
                <AlertTitle>No close aspects in this selection</AlertTitle>
                <AlertDescription>
                  This does not imply poor compatibility. The 3° orb is
                  deliberately narrow.
                </AlertDescription>
              </Alert>
            )}
          </section>
        )}
      </TabsContent>
    </Tabs>
  );
}
