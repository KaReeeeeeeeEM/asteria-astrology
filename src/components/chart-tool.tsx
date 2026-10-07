"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Search,
  Save,
  Download,
  RotateCcw,
  LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";
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
        <Badge variant="outline">STEP {step + 1} OF 2</Badge>
        <Progress value={(step + 1) * 50} aria-label="Birth chart progress" />
        <span>{step === 0 ? "Your birth moment" : "Your birth place"}</span>
      </div>
      <FieldGroup key={step} className="step-panel">
        {step === 0 && (
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="birth-name">Chart name</FieldLabel>
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
                Use a nickname if you prefer. Public calculations stay in your
                browser.
              </FieldDescription>
            </Field>
            <div className="form-columns">
              <Field>
                <FieldLabel htmlFor="birth-date">Birth date</FieldLabel>
                <DatePicker
                  id="birth-date"
                  value={input.date}
                  onChange={(v) => update("date", v)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="birth-time">Birth time</FieldLabel>
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
                I don’t know my birth time
              </FieldLabel>
            </Field>
            {input.unknownTime && (
              <FieldDescription>
                We’ll use local noon for planetary positions and omit rising
                sign and houses. The Moon and boundary placements may be
                uncertain.
              </FieldDescription>
            )}
          </FieldGroup>
        )}
        {step === 1 && (
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="city-search">
                Find your birth city
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
                  Search
                </Button>
              </div>
              {locationMessage && (
                <FieldDescription role="status">
                  {locationMessage}
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
              <FieldLabel htmlFor="birth-place">Birth place</FieldLabel>
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
                <FieldLabel htmlFor="birth-lat">Latitude</FieldLabel>
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
                <FieldLabel htmlFor="birth-lon">Longitude</FieldLabel>
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
              <FieldLabel htmlFor="birth-zone">Time zone at birth</FieldLabel>
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
                        {z.replaceAll("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldDescription>
                IANA time zone, such as Africa/Dar_es_Salaam. Historical
                daylight saving is applied. For an ambiguous repeated hour,
                verify the UTC offset with your birth record.
              </FieldDescription>
            </Field>
          </FieldGroup>
        )}
        {error && (
          <Alert variant="destructive" role="alert">
            <AlertTitle>Check your details</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
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
            Back to birth moment
          </Button>
        )}
        <Button size="lg" type="submit">
          {step === 0 ? "Continue to birth place" : label}
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
          <span className="eyebrow">YOUR CELESTIAL BLUEPRINT</span>
          <h2>{chart.input.name}’s birth chart</h2>
          <p>
            {chart.input.date} ·{" "}
            {chart.input.unknownTime ? "Time unknown" : chart.input.time} ·{" "}
            {chart.input.place}
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
            Export
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
                {saving ? "Saving…" : "Save chart"}
              </Button>
            ) : (
              <Button asChild size="sm">
                <Link href="/signup">
                  Sign up to save
                  <Save data-icon="inline-end" />
                </Link>
              </Button>
            ))}
        </div>
      </div>
      <div className="chart-overview">
        <CelestialWheel placements={chart.placements} aspects={chart.aspects} />
        <div className="big-three">
          <span className="eyebrow">YOUR BIG THREE</span>
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
              <span>{p.symbol}</span>
              <div>
                <span className="eyebrow">{p.label}</span>
                <h3>{p.name}</h3>
                <p>{p.text.split(". ").slice(0, 2).join(". ")}.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Tabs defaultValue="placements">
        <TabsList>
          <TabsTrigger value="placements">Placements</TabsTrigger>
          <TabsTrigger value="aspects">
            Aspects ({chart.aspects.length})
          </TabsTrigger>
          <TabsTrigger value="houses">Houses</TabsTrigger>
          <TabsTrigger value="elements">Elements</TabsTrigger>
        </TabsList>
        <TabsContent value="placements">
          <div className="placement-list">
            {chart.placements.map((p) => (
              <div className="placement-row" key={p.name}>
                <span className="planet-glyph">{p.symbol}</span>
                <div>
                  <strong>{p.name}</strong>
                  <span>{p.theme}</span>
                </div>
                <span>
                  {p.signSymbol} {p.sign}
                </span>
                <span className="degree">{degreeText(p.degree)}</span>
                <span className="small">
                  {p.house ? `House ${p.house}` : "—"}
                </span>
                {p.retrograde && <Badge variant="secondary">Rx</Badge>}
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="aspects">
          <div className="aspect-grid">
            {chart.aspects.map((a) => (
              <div key={`${a.a}-${a.b}`} className="aspect-item">
                <div>
                  <span>{a.symbol}</span>
                  <h3>
                    {a.a} {a.name.toLowerCase()} {a.b}
                  </h3>
                  <Badge variant="secondary">{a.orb.toFixed(1)}° orb</Badge>
                </div>
                <p>{aspectReading(a)}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="houses">
          {chart.ascendant === null ? (
            <Alert>
              <AlertTitle>Houses are unavailable</AlertTitle>
              <AlertDescription>
                Enter a known birth time and location below 66° latitude to
                calculate whole-sign houses.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="house-grid">
              {houseThemes.map((h, i) => {
                const s = signAt(chart.ascendant! + i * 30);
                return (
                  <div className="house-item" key={h}>
                    <span className="eyebrow">HOUSE {i + 1}</span>
                    <h3>
                      {s.symbol} {s.name}
                    </h3>
                    <p>{h}</p>
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
                  {e}
                  <span>{n}/10</span>
                </h3>
                <div className="element-track">
                  <div style={{ width: `${n * 10}%` }} />
                </div>
                <p className="small muted">
                  {Math.round(n * 10)}% of the ten planetary placements
                </p>
              </div>
            ))}
          </div>
          <p className="method-note">
            Each planet has equal weight. These symbolic counts do not measure
            your personality or abilities.
          </p>
        </TabsContent>
      </Tabs>
      <p className="method-note">
        {chart.method}
        <br />
        UTC moment: {chart.utc}.{" "}
        {chart.midheaven !== null &&
          `Midheaven: ${signAt(chart.midheaven).name} ${degreeText(chart.midheaven)}.`}{" "}
        {chart.input.unknownTime &&
          "Planetary placements use local noon; signs near boundaries may be uncertain."}{" "}
        Geocentric longitudes are calculated with Astronomy Engine. This is an
        approximate educational chart, with simplified mean-obliquity angle
        calculations; it does not include nodes, Chiron, fixed stars,
        declination parallels, or sidereal techniques.
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
        Edit birth details
      </Button>
      <ChartResult chart={chart} />
    </>
  ) : (
    <div className="chart-form-layout">
      <div className="chart-form-intro">
        <CelestialWheel hero />
        <h2>
          Your sky.
          <br />
          <em>Your story.</em>
        </h2>
        <p>
          A snapshot of the cosmos at the moment you arrived. All ten planetary
          placements, aspects, and whole-sign houses—free to explore.
        </p>
        <div className="small muted">
          Your birth details stay in this browser until you choose to save a
          chart. City search sends only the city name to Open-Meteo.
        </div>
      </div>
      <div className="form-panel">
        <span className="eyebrow">LET’S BEGIN WITH YOU</span>
        <h2>A few earthly details.</h2>
        <p className="muted">
          For the most accurate chart, use the time on your birth record.
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
