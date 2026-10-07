"use client";
import { Text } from "@/components/language";

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
        <TabsTrigger value="signs">
          <Text>{"Sign connection"}</Text>
        </TabsTrigger>
        <TabsTrigger value="charts">
          <Text>{"Two-chart synastry"}</Text>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="signs">
        <div className="journey-progress">
          <Progress
            value={((step + 1) / 3) * 100}
            aria-label="Connection journey progress"
          />
          <span>
            <Text>{"STEP "}</Text>
            <Text>{step + 1}</Text>
            <Text>{"OF 3"}</Text>
          </span>
        </div>
        {step === 0 && (
          <Card className="connection-welcome">
            <CardHeader>
              <CardTitle>
                <h2>
                  <Text>{"Two signs. A little spark."}</Text>
                </h2>
              </CardTitle>
              <CardDescription>
                <Text>{"Get curious about your cosmic connection."}</Text>
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
                <Text>{"Choose our signs"}</Text>
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
                  <label className="eyebrow">
                    <Text>{s.label}</Text>
                  </label>
                  <Select value={s.v} onValueChange={s.set}>
                    <SelectTrigger aria-label={s.label}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {signs.map((x) => (
                          <SelectItem key={x.name} value={x.name}>
                            <Text>{x.symbol}</Text> <Text>{x.name}</Text>
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
                <Text>{"Back"}</Text>
              </Button>
              <Button onClick={() => setStep(2)}>
                <Text>{"Reveal our connection"}</Text>
                <Heart data-icon="inline-end" />
              </Button>
            </div>
          </section>
        )}
        {step === 2 && (
          <section className="step-panel">
            <Button variant="outline" onClick={() => setStep(1)}>
              <Text>{"Change our signs"}</Text>
            </Button>
            <div className="connection-art">
              <ZodiacMascot sign={s1.name} />
              <Heart strokeWidth={0.6} />
              <ZodiacMascot sign={s2.name} />
            </div>
            <div className="match-result" aria-live="polite">
              <div className="match-percent">
                <strong>
                  <Text>{match.percentage}</Text>%
                </strong>
                <span>
                  <Text>{"Symbolic match"}</Text>
                </span>
              </div>
              <div className="match-breakdown">
                {match.scores.map((x) => (
                  <div key={x.label}>
                    <span>
                      <Text>{x.label}</Text> · <Text>{x.weight}</Text>
                      <Text>{"% weight"}</Text>
                    </span>
                    <strong>
                      <Text>{x.value}</Text>%
                    </strong>
                    <div className="match-track">
                      <i style={{ width: `${x.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="connection-reading">
              <span className="eyebrow">
                <Text>{s1.element}</Text>
                <Text>{"MEETS "}</Text>
                <Text>{s2.element}</Text>
              </span>
              <h2>
                <Text>
                  {same
                    ? "A familiar kind of magic."
                    : harmonious
                      ? "A spark of understanding."
                      : "A different kind of possibility."}
                </Text>
              </h2>
              <p>
                <Text>
                  {same
                    ? `${s1.name} and ${s2.name} share the ${s1.element.toLowerCase()} element, suggesting a familiar symbolic language. Familiarity can support understanding, while differences in modality invite new approaches.`
                    : harmonious
                      ? `${s1.name} brings ${s1.gift.toLowerCase()}, while ${s2.name} brings ${s2.gift.toLowerCase()}. Your elements are traditionally considered complementary—a starting point for noticing how you encourage one another.`
                      : `${s1.name} and ${s2.name} approach life through different elements. The contrast between ${s1.gift.toLowerCase()} and ${s2.gift.toLowerCase()} can become a useful conversation about needs and perspective.`}
                </Text>
              </p>
              <div className="connection-prompts">
                <div>
                  <h3>
                    <Text>{"A place to connect"}</Text>
                  </h3>
                  <p>
                    <Text>
                      {"Ask each other: “When do you feel most supported?” Let"}
                    </Text>
                    <Text> </Text>
                    <Text>{s1.gift.toLowerCase()}</Text>
                    <Text>{"and"}</Text>
                    <Text>{s2.gift.toLowerCase()}</Text>
                    <Text>{"shape how you listen."}</Text>
                  </p>
                </div>
                <div>
                  <h3>
                    <Text>{"Room to grow"}</Text>
                  </h3>
                  <p>
                    <Text>{"Practice "}</Text>
                    <Text>{s1.growth.toLowerCase()}</Text>
                    <Text>{"and"}</Text>
                    <Text> </Text>
                    <Text>{s2.growth.toLowerCase()}</Text>
                    <Text>
                      {
                        ". A chart cannot replace consent, kindness, or honest communication."
                      }
                    </Text>
                  </p>
                </div>
              </div>
              <p className="method-note">
                <Text>
                  {
                    "This playful score combines elemental flow (55%), sign geometry (30%), and modality (15%). It is a designed symbolic scale, not a measured probability of relationship success. Explore two-chart synastry for more detail."
                  }
                </Text>
              </p>
            </div>
          </section>
        )}
      </TabsContent>
      <TabsContent value="charts">
        <div className="synastry-intro">
          <h2>
            <Text>{"A conversation between two skies."}</Text>
          </h2>
          <p>
            <Text>
              {
                "Enter birth details with the other person’s permission. Calculations remain in your browser."
              }
            </Text>
          </p>
        </div>
        <div className="synastry-forms">
          <section>
            <h3>
              <Text>
                {one ? `${one.input.name}’s chart is ready` : "First person"}
              </Text>
            </h3>
            {one ? (
              <Button variant="outline" onClick={() => setOne(null)}>
                <Text>{"Edit first chart"}</Text>
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
              <Text>
                {two ? `${two.input.name}’s chart is ready` : "Second person"}
              </Text>
            </h3>
            {two ? (
              <Button variant="outline" onClick={() => setTwo(null)}>
                <Text>{"Edit second chart"}</Text>
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
              <Text>{one.input.name}</Text> <ArrowRight size={24} />{" "}
              <Text>{two.input.name}</Text>
            </h2>
            <p className="muted">
              <Text>{aspects.length}</Text>
              <Text>
                {
                  "cross-chart longitude aspects within a 3° orb. First planet belongs to "
                }
              </Text>
              <Text>{one.input.name}</Text>
              <Text>{"; second to"}</Text>
              <Text> </Text>
              <Text>{two.input.name}</Text>.
            </p>
            <div className="aspect-grid">
              {aspects.map((x) => (
                <div className="aspect-item" key={`${x.a}-${x.b}`}>
                  <h3>
                    <Text>{x.a}</Text> <Text>{x.name.toLowerCase()}</Text>{" "}
                    <Text>{x.b}</Text>
                  </h3>
                  <span className="eyebrow">
                    <Text>{x.orb.toFixed(1)}</Text>
                    <Text>{"° ORB · "}</Text>
                    <Text>{x.tone}</Text>
                  </span>
                  <p>
                    <Text>{aspectReading(x)}</Text>
                  </p>
                </div>
              ))}
            </div>
            {!aspects.length && (
              <Alert>
                <AlertTitle>
                  <Text>{"No close aspects in this selection"}</Text>
                </AlertTitle>
                <AlertDescription>
                  <Text>
                    {
                      "This does not imply poor compatibility. The 3° orb is deliberately narrow."
                    }
                  </Text>
                </AlertDescription>
              </Alert>
            )}
          </section>
        )}
      </TabsContent>
    </Tabs>
  );
}
