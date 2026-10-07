"use client";
import { Text } from "@/components/language";

import { useState } from "react";
import Link from "@/components/app-link";
import {
  ArrowUpRight,
  Search,
  Save,
  Download,
  RotateCcw,
  LoaderCircle,
} from "lucide-react";
import { toast } from "@/lib/localized-toast";
import { Button } from "./ui/button";
import { DatePicker, TimePicker } from "./date-picker";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "./ui/field";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Progress } from "./ui/progress";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "./ui/select";
import { Badge } from "./ui/badge";
import {
  calculateChart,
  degreeText,
  aspectReading,
  type Chart,
  type BirthInput,
} from "@/lib/astrology";
import { birthSchema } from "@/lib/validation";
import { signAt, houseThemes } from "@/lib/knowledge";
import { authClient } from "@/lib/auth-client";
import { CelestialWheel } from "./wheel";
export const defaultBirth: BirthInput = {
  name: "",
  date: "",
  time: "12:00",
  timezone: "Africa/Dar_es_Salaam",
  latitude: -6.7924,
  longitude: 39.2083,
  place: "Dar es Salaam, Tanzania",
  unknownTime: false,
};
type City = {
  id: number;
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone?: string;
};
export function BirthForm({
  onCalculate,
  initial = defaultBirth,
  label = "Create my birth chart",
}: {
  onCalculate: (input: BirthInput) => void;
  initial?: BirthInput;
  label?: string;
}) {
  const [input, setInput] = useState(initial);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [searching, setSearching] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  function update<K extends keyof BirthInput>(key: K, value: BirthInput[K]) {
    setInput((x) => ({ ...x, [key]: value }));
    setError("");
  }
  async function search() {
    if (query.trim().length < 2) {
      setLocationMessage("Enter at least two letters.");
      return;
    }
    setSearching(true);
    try {
      const r = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`,
        { signal: AbortSignal.timeout(10000) },
      );
      if (!r.ok) throw new Error();
      const d = await r.json();
      setCities(d.results || []);
      setLocationMessage(
        d.results?.length
          ? "Select your city below."
          : "No matching cities. Try another spelling or enter coordinates below.",
      );
    } catch {
      setLocationMessage(
        "City search is unavailable. You can enter your place, coordinates, and time zone below.",
      );
    } finally {
      setSearching(false);
    }
  }
  return (
    <form
      className="birth-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step === 0) {
          const check = birthSchema
            .pick({ name: true, date: true, time: true, unknownTime: true })
            .safeParse(input);
          if (!check.success) {
            setError(check.error.issues[0].message);
            return;
          }
          setError("");
          setStep(1);
          return;
        }
        const result = birthSchema.safeParse(input);
        if (!result.success) {
          setError(result.error.issues[0].message);
          return;
        }
        try {
          calculateChart(result.data);
          onCalculate(result.data);
        } catch (e) {
          setError(
            e instanceof Error ? e.message : "Unable to calculate this chart.",
          );
        }
      }}
    >
      <div className="journey-progress">
        <Badge variant="outline">
          <Text>{"STEP "}</Text>
          <Text>{step + 1}</Text>
          <Text>{"OF 2"}</Text>
        </Badge>
        <Progress value={(step + 1) * 50} aria-label="Birth chart progress" />
        <span>
          <Text>{step === 0 ? "Your birth moment" : "Your birth place"}</Text>
        </span>
      </div>
      <FieldGroup key={step} className="step-panel">
        {step === 0 && (
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="birth-name">
                <Text>{"Chart name"}</Text>
              </FieldLabel>
              <Input
                id="birth-name"
                autoComplete="off"
                placeholder="Your name or a nickname"
                maxLength={80}
                value={input.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />
              <FieldDescription>
                <Text>
                  {
                    "Use a nickname if you prefer. Public calculations stay in your browser."
                  }
                </Text>
              </FieldDescription>
            </Field>
            <div className="form-columns">
              <Field>
                <FieldLabel htmlFor="birth-date">
                  <Text>{"Birth date"}</Text>
                </FieldLabel>
                <DatePicker
                  id="birth-date"
                  value={input.date}
                  onChange={(v) => update("date", v)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="birth-time">
                  <Text>{"Birth time"}</Text>
                </FieldLabel>
                <TimePicker
                  id="birth-time"
                  value={input.time}
                  onChange={(v) => update("time", v)}
                  disabled={input.unknownTime}
                />
              </Field>
            </div>
            <Field orientation="horizontal">
              <Checkbox
                id="unknown-time"
                checked={input.unknownTime}
                onCheckedChange={(v) => update("unknownTime", v === true)}
              />
              <FieldLabel htmlFor="unknown-time">
                <Text>{"I don’t know my birth time"}</Text>
              </FieldLabel>
            </Field>
            {input.unknownTime && (
              <FieldDescription>
                <Text>
                  {
                    "We’ll use local noon for planetary positions and omit rising sign and houses. The Moon and boundary placements may be uncertain."
                  }
                </Text>
              </FieldDescription>
            )}
          </FieldGroup>
        )}
        {step === 1 && (
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="city-search">
                <Text>{"Find your birth city"}</Text>
              </FieldLabel>
              <div className="search-city">
                <Input
                  id="city-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a city, e.g. Nairobi"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      void search();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={search}
                  disabled={searching}
                  aria-label="Search birth city"
                >
                  {searching ? (
                    <LoaderCircle
                      data-icon="inline-start"
                      className="animate-spin"
                    />
                  ) : (
                    <Search data-icon="inline-start" />
                  )}
                  <Text>{"Search"}</Text>
                </Button>
              </div>
              {locationMessage && (
                <FieldDescription role="status">
                  <Text>{locationMessage}</Text>
                </FieldDescription>
              )}
              {cities.length > 0 && (
                <div className="city-results">
                  {cities.map((c) => (
                    <Button
                      variant="ghost"
                      type="button"
                      key={c.id}
                      onClick={() => {
                        setInput((x) => ({
                          ...x,
                          place: [c.name, c.admin1, c.country]
                            .filter(Boolean)
                            .join(", "),
                          latitude: c.latitude,
                          longitude: c.longitude,
                          timezone: c.timezone || x.timezone,
                        }));
                        setCities([]);
                        setQuery("");
                        setLocationMessage(
                          `Selected ${c.name}, ${c.country || ""}. Please confirm the time zone.`,
                        );
                      }}
                    >
                      {c.name}, {c.admin1 || c.country}
                    </Button>
                  ))}
                </div>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="birth-place">
                <Text>{"Birth place"}</Text>
              </FieldLabel>
              <Input
                id="birth-place"
                value={input.place}
                onChange={(e) => update("place", e.target.value)}
                maxLength={160}
                required
              />
            </Field>
            <div className="form-columns">
              <Field>
                <FieldLabel htmlFor="birth-lat">
                  <Text>{"Latitude"}</Text>
                </FieldLabel>
                <Input
                  id="birth-lat"
                  type="number"
                  step="any"
                  min={-90}
                  max={90}
                  value={input.latitude}
                  onChange={(e) => update("latitude", Number(e.target.value))}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="birth-lon">
                  <Text>{"Longitude"}</Text>
                </FieldLabel>
                <Input
                  id="birth-lon"
                  type="number"
                  step="any"
                  min={-180}
                  max={180}
                  value={input.longitude}
                  onChange={(e) => update("longitude", Number(e.target.value))}
                  required
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="birth-zone">
                <Text>{"Time zone at birth"}</Text>
              </FieldLabel>
              <Select
                value={input.timezone}
                onValueChange={(v) => update("timezone", v)}
              >
                <SelectTrigger id="birth-zone" aria-label="Time zone at birth">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Array.from(
                      new Set([
                        input.timezone,
                        "UTC",
                        ...Intl.supportedValuesOf("timeZone"),
                      ]),
                    ).map((z) => (
                      <SelectItem value={z} key={z}>
                        <Text>{z.replaceAll("_", " ")}</Text>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldDescription>
                <Text>
                  {
                    "IANA time zone, such as Africa/Dar_es_Salaam. Historical daylight saving is applied. For an ambiguous repeated hour, verify the UTC offset with your birth record."
                  }
                </Text>
              </FieldDescription>
            </Field>
          </FieldGroup>
        )}
        {error && (
          <Alert variant="destructive" role="alert">
            <AlertTitle>
              <Text>{"Check your details"}</Text>
            </AlertTitle>
            <AlertDescription>
              <Text>{error}</Text>
            </AlertDescription>
          </Alert>
        )}
        {step === 1 && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setStep(0);
              setError("");
            }}
          >
            <Text>{"Back to birth moment"}</Text>
          </Button>
        )}
        <Button size="lg" type="submit">
          <Text>{step === 0 ? "Continue to birth place" : label}</Text>
          <ArrowUpRight data-icon="inline-end" />
        </Button>
      </FieldGroup>
    </form>
  );
}
export function ChartResult({
  chart,
  canSave = true,
}: {
  chart: Chart;
  canSave?: boolean;
}) {
  const { data } = authClient.useSession();
  const [saving, setSaving] = useState(false);
  const sun = chart.placements[0];
  const moon = chart.placements[1];
  return (
    <div className="chart-result">
      <div className="chart-result-heading">
        <div>
          <span className="eyebrow">
            <Text>{"YOUR CELESTIAL BLUEPRINT"}</Text>
          </span>
          <h2>
            {chart.input.name}
            <Text>{"’s birth chart"}</Text>
          </h2>
          <p>
            <Text>{chart.input.date}</Text> ·<Text> </Text>
            <Text>
              {chart.input.unknownTime ? "Time unknown" : chart.input.time}
            </Text>{" "}
            ·<Text> </Text>
            <Text>{chart.input.place}</Text>
          </p>
        </div>
        <div className="chart-result-actions">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const blob = new Blob([JSON.stringify(chart, null, 2)], {
                type: "application/json",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "asteria-birth-chart.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download data-icon="inline-start" />
            <Text>{"Export"}</Text>
          </Button>
          {canSave &&
            (data ? (
              <Button
                size="sm"
                disabled={saving}
                onClick={async () => {
                  setSaving(true);
                  try {
                    const r = await fetch("/api/charts", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(chart.input),
                    });
                    const b = await r.json();
                    if (!r.ok) throw new Error(b.error);
                    toast.success("Chart saved to your dashboard");
                  } catch (e) {
                    toast.error(
                      e instanceof Error ? e.message : "Unable to save",
                    );
                  } finally {
                    setSaving(false);
                  }
                }}
              >
                <Save data-icon="inline-start" />
                <Text>{saving ? "Saving…" : "Save chart"}</Text>
              </Button>
            ) : (
              <Button asChild size="sm">
                <Link href="/signup">
                  <Text>{"Sign up to save"}</Text>
                  <Save data-icon="inline-end" />
                </Link>
              </Button>
            ))}
        </div>
      </div>
      <div className="chart-overview">
        <CelestialWheel placements={chart.placements} aspects={chart.aspects} />
        <div className="big-three">
          <span className="eyebrow">
            <Text>{"YOUR BIG THREE"}</Text>
          </span>
          {[
            {
              symbol: "☉",
              label: "SUN · YOUR EXPRESSION",
              name: sun.sign,
              text: signAt(sun.longitude).description,
            },
            {
              symbol: "☽",
              label: "MOON · YOUR INNER WORLD",
              name: moon.sign,
              text: signAt(moon.longitude).description,
            },
            {
              symbol: "↑",
              label: "RISING · YOUR ORIENTATION",
              name:
                chart.ascendant === null
                  ? "Unknown"
                  : signAt(chart.ascendant).name,
              text:
                chart.ascendant === null
                  ? "A reliable birth time and latitude below 66° are needed to calculate your rising sign."
                  : signAt(chart.ascendant).description,
            },
          ].map((p) => (
            <div className="big-three-item" key={p.label}>
              <span>
                <Text>{p.symbol}</Text>
              </span>
              <div>
                <span className="eyebrow">
                  <Text>{p.label}</Text>
                </span>
                <h3>
                  <Text>{p.name}</Text>
                </h3>
                <p>
                  <Text>{p.text.split(". ").slice(0, 2).join(". ")}</Text>.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Tabs defaultValue="placements">
        <TabsList>
          <TabsTrigger value="placements">
            <Text>{"Placements"}</Text>
          </TabsTrigger>
          <TabsTrigger value="aspects">
            <Text>{"Aspects ("}</Text>
            <Text>{chart.aspects.length}</Text>)
          </TabsTrigger>
          <TabsTrigger value="houses">
            <Text>{"Houses"}</Text>
          </TabsTrigger>
          <TabsTrigger value="elements">
            <Text>{"Elements"}</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="placements">
          <div className="placement-list">
            {chart.placements.map((p) => (
              <div className="placement-row" key={p.name}>
                <span className="planet-glyph">
                  <Text>{p.symbol}</Text>
                </span>
                <div>
                  <strong>
                    <Text>{p.name}</Text>
                  </strong>
                  <span>
                    <Text>{p.theme}</Text>
                  </span>
                </div>
                <span>
                  <Text>{p.signSymbol}</Text> <Text>{p.sign}</Text>
                </span>
                <span className="degree">
                  <Text>{degreeText(p.degree)}</Text>
                </span>
                <span className="small">
                  <Text>{p.house ? `House ${p.house}` : "—"}</Text>
                </span>
                {p.retrograde && (
                  <Badge variant="secondary">
                    <Text>{"Rx"}</Text>
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="aspects">
          <div className="aspect-grid">
            {chart.aspects.map((a) => (
              <div key={`${a.a}-${a.b}`} className="aspect-item">
                <div>
                  <span>
                    <Text>{a.symbol}</Text>
                  </span>
                  <h3>
                    <Text>{a.a}</Text> <Text>{a.name.toLowerCase()}</Text>{" "}
                    <Text>{a.b}</Text>
                  </h3>
                  <Badge variant="secondary">
                    <Text>{a.orb.toFixed(1)}</Text>
                    <Text>{"° orb"}</Text>
                  </Badge>
                </div>
                <p>
                  <Text>{aspectReading(a)}</Text>
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="houses">
          {chart.ascendant === null ? (
            <Alert>
              <AlertTitle>
                <Text>{"Houses are unavailable"}</Text>
              </AlertTitle>
              <AlertDescription>
                <Text>
                  {
                    "Enter a known birth time and location below 66° latitude to calculate whole-sign houses."
                  }
                </Text>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="house-grid">
              {houseThemes.map((h, i) => {
                const s = signAt(chart.ascendant! + i * 30);
                return (
                  <div className="house-item" key={h}>
                    <span className="eyebrow">
                      <Text>{"HOUSE "}</Text>
                      <Text>{i + 1}</Text>
                    </span>
                    <h3>
                      <Text>{s.symbol}</Text> <Text>{s.name}</Text>
                    </h3>
                    <p>
                      <Text>{h}</Text>
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
        <TabsContent value="elements">
          <div className="element-distribution">
            {Object.entries(chart.elements).map(([e, n]) => (
              <div key={e}>
                <h3>
                  <Text>{e}</Text>
                  <span>{n}/10</span>
                </h3>
                <div className="element-track">
                  <div style={{ width: `${n * 10}%` }} />
                </div>
                <p className="small muted">
                  <Text>{Math.round(n * 10)}</Text>
                  <Text>{"% of the ten planetary placements"}</Text>
                </p>
              </div>
            ))}
          </div>
          <p className="method-note">
            <Text>
              {
                "Each planet has equal weight. These symbolic counts do not measure your personality or abilities."
              }
            </Text>
          </p>
        </TabsContent>
      </Tabs>
      <p className="method-note">
        <Text>{chart.method}</Text>
        <br />
        <Text>{"UTC moment: "}</Text>
        <Text>{chart.utc}</Text>.<Text> </Text>
        <Text>
          {chart.midheaven !== null &&
            `Midheaven: ${signAt(chart.midheaven).name} ${degreeText(chart.midheaven)}.`}
        </Text>
        <Text> </Text>
        <Text>
          {chart.input.unknownTime &&
            "Planetary placements use local noon; signs near boundaries may be uncertain."}
        </Text>
        <Text> </Text>
        <Text>
          {
            "Geocentric longitudes are calculated with Astronomy Engine. This is an approximate educational chart, with simplified mean-obliquity angle calculations; it does not include nodes, Chiron, fixed stars, declination parallels, or sidereal techniques."
          }
        </Text>
      </p>
    </div>
  );
}
export function ChartTool() {
  const [chart, setChart] = useState<Chart | null>(null);
  return chart ? (
    <>
      <Button variant="ghost" onClick={() => setChart(null)}>
        <RotateCcw data-icon="inline-start" />
        <Text>{"Edit birth details"}</Text>
      </Button>
      <ChartResult chart={chart} />
    </>
  ) : (
    <div className="chart-form-layout">
      <div className="chart-form-intro">
        <CelestialWheel hero />
        <h2>
          <Text>{"Your sky."}</Text>
          <br />
          <em>
            <Text>{"Your story."}</Text>
          </em>
        </h2>
        <p>
          <Text>
            {
              "A snapshot of the cosmos at the moment you arrived. All ten planetary placements, aspects, and whole-sign houses—free to explore."
            }
          </Text>
        </p>
        <div className="small muted">
          <Text>
            {
              "Your birth details stay in this browser until you choose to save a chart. City search sends only the city name to Open-Meteo."
            }
          </Text>
        </div>
      </div>
      <div className="form-panel">
        <span className="eyebrow">
          <Text>{"LET’S BEGIN WITH YOU"}</Text>
        </span>
        <h2>
          <Text>{"A few earthly details."}</Text>
        </h2>
        <p className="muted">
          <Text>
            {"For the most accurate chart, use the time on your birth record."}
          </Text>
        </p>
        <BirthForm
          onCalculate={(i) => {
            setChart(calculateChart(i));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>
    </div>
  );
}
