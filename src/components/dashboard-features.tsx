"use client";
import { LocalizedDate } from "./localized-date";
import { Text, useLanguage } from "@/components/language";

import { useEffect, useState } from "react";
import Link from "@/components/app-link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Fingerprint,
  ArrowUpRight,
  Download,
} from "lucide-react";
import { toast } from "@/lib/localized-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "./ui/empty";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { authClient } from "@/lib/auth-client";
import { calculateChart, type BirthInput } from "@/lib/astrology";
import { articles } from "@/lib/knowledge";
import { BirthForm, ChartResult } from "./chart-tool";
type SavedChart = { id: string; input: BirthInput; createdAt: string };
type Entry = { id: string; text: string; mood: string; createdAt: string };
type SavedArticle = { id: string; slug: string };
async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const r = await fetch(path, options);
  const d = await r.json();
  if (!r.ok) throw new Error(d.error || "Request failed");
  return d;
}
function jsonOptions(data: unknown): RequestInit {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
}
export function SavedCharts() {
  const { t } = useLanguage();
  const [charts, setCharts] = useState<SavedChart[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [active, setActive] = useState<SavedChart | null>(null);
  const [busy, setBusy] = useState(false);
  const [remove, setRemove] = useState<SavedChart | null>(null);
  const [error, setError] = useState("");
  async function load() {
    try {
      setCharts(await api<SavedChart[]>("/api/charts"));
      setError("");
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    api<SavedChart[]>("/api/charts")
      .then(setCharts)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <div className="dashboard-heading enter">
        <div>
          <span className="eyebrow">
            <Text>{"YOUR CELESTIAL BLUEPRINTS"}</Text>
          </span>
          <h1>
            <Text>{"Every chart has "}</Text>
            <em>
              <Text>{"a story."}</Text>
            </em>
          </h1>
          <p>
            <Text>
              {
                "Save up to 20 charts. Your most recently saved chart powers your overview."
              }
            </Text>
          </p>
        </div>
        <Button
          onClick={() => {
            setCreating(true);
            setActive(null);
          }}
        >
          <Plus data-icon="inline-start" />
          <Text>{"New birth chart"}</Text>
        </Button>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>
            <Text>{"Couldn’t load your charts"}</Text>
          </AlertTitle>
          <AlertDescription>
            <Text>{error}</Text>
            <Text> </Text>
            <Button variant="link" onClick={load}>
              <Text>{"Retry"}</Text>
            </Button>
          </AlertDescription>
        </Alert>
      )}
      {creating ? (
        <div className="dashboard-form-panel">
          <Button variant="ghost" onClick={() => setCreating(false)}>
            <Text>{"← Back to my charts"}</Text>
          </Button>
          <BirthForm
            onCalculate={async (input) => {
              setBusy(true);
              try {
                const saved = await api<SavedChart>(
                  "/api/charts",
                  jsonOptions(input),
                );
                await load();
                setCreating(false);
                setActive(saved);
                toast.success("Your chart is saved");
              } catch (e) {
                toast.error(String(e));
              } finally {
                setBusy(false);
              }
            }}
            label={busy ? "Saving chart…" : "Calculate & save chart"}
          />
        </div>
      ) : active ? (
        <>
          <Button variant="ghost" onClick={() => setActive(null)}>
            <Text>{"← All saved charts"}</Text>
          </Button>
          <ChartResult chart={calculateChart(active.input)} canSave={false} />
        </>
      ) : loading ? (
        <div className="saved-chart-grid">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      ) : charts.length ? (
        <div className="saved-chart-grid">
          {charts.map((c) => {
            const chart = calculateChart(c.input);
            return (
              <div className="saved-chart-card" key={c.id}>
                <span className="saved-chart-symbol">
                  <Text>{chart.placements[0].signSymbol}</Text>
                </span>
                <Badge variant="secondary">
                  <Text>{chart.placements[0].sign}</Text>
                  <Text>{"Sun"}</Text>
                </Badge>
                <h2>{c.input.name}</h2>
                <p>
                  <Text>{c.input.date}</Text> · <Text>{c.input.place}</Text>
                </p>
                <div className="saved-chart-actions">
                  <Button variant="outline" onClick={() => setActive(c)}>
                    <Text>{"Explore chart"}</Text>
                    <ArrowUpRight data-icon="inline-end" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={`${t("Delete chart")}: ${c.input.name}`}
                    onClick={() => setRemove(c)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>
              <Text>{"Your first chart is waiting."}</Text>
            </EmptyTitle>
            <EmptyDescription>
              <Text>
                {
                  "Create a birth chart to explore your placements, aspects, and personal transits."
                }
              </Text>
            </EmptyDescription>
          </EmptyHeader>
          <Button onClick={() => setCreating(true)}>
            <Text>{"Create my first chart"}</Text>
            <Plus data-icon="inline-end" />
          </Button>
        </Empty>
      )}
      <Dialog open={!!remove} onOpenChange={(v) => !v && setRemove(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Text>{"Delete this saved chart?"}</Text>
            </DialogTitle>
            <DialogDescription>
              {remove?.input.name}
              <Text>
                {
                  "’s chart will be removed from your account. You can calculate it again with its birth details."
                }
              </Text>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemove(null)}>
              <Text>{"Keep chart"}</Text>
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                try {
                  await api(`/api/charts?id=${remove?.id}`, {
                    method: "DELETE",
                  });
                  setRemove(null);
                  await load();
                  toast("Chart removed");
                } catch (e) {
                  toast.error(String(e));
                }
              }}
            >
              <Text>{"Delete chart"}</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
export function Journal() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [text, setText] = useState("");
  const [mood, setMood] = useState("Reflective");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [remove, setRemove] = useState<Entry | null>(null);
  async function load() {
    try {
      setEntries(await api<Entry[]>("/api/journal"));
      setError("");
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    api<Entry[]>("/api/journal")
      .then(setEntries)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <div className="dashboard-heading enter">
        <div>
          <span className="eyebrow">
            <Text>{"A PRIVATE PLACE TO PAUSE"}</Text>
          </span>
          <h1>
            <Text>{"Notice your "}</Text>
            <em>
              <Text>{"own rhythms."}</Text>
            </em>
          </h1>
          <p>
            <Text>
              {
                "One sentence, a small observation, or a thought you want to keep."
              }
            </Text>
          </p>
        </div>
      </div>
      <div className="journal-layout">
        <form
          className="journal-compose"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            try {
              await api("/api/journal", jsonOptions({ text, mood }));
              setText("");
              await load();
              toast.success("Reflection saved");
            } catch (e) {
              toast.error(String(e));
            } finally {
              setBusy(false);
            }
          }}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="journal-mood">
                <Text>{"How are you arriving?"}</Text>
              </FieldLabel>
              <Select value={mood} onValueChange={setMood}>
                <SelectTrigger id="journal-mood">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[
                      "Grounded",
                      "Inspired",
                      "Reflective",
                      "Restless",
                      "Tender",
                    ].map((m) => (
                      <SelectItem value={m} key={m}>
                        <Text>{m}</Text>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="reflection">
                <Text>{"Your reflection"}</Text>
              </FieldLabel>
              <Textarea
                id="reflection"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={5000}
                required
                placeholder="What is asking for your attention today?"
                rows={8}
              />
              <span className="small muted">
                <Text>{text.length}</Text>
                <Text>{"/5000 · Only visible in your account"}</Text>
              </span>
            </Field>
            <Button disabled={busy || !text.trim()}>
              <Text>{busy ? "Saving…" : "Save my reflection"}</Text>
              <ArrowUpRight data-icon="inline-end" />
            </Button>
          </FieldGroup>
        </form>
        <section className="journal-entries">
          <h2>
            <Text>{"Your recent chapters"}</Text>
          </h2>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>
                <Text>{"Couldn’t load reflections"}</Text>
              </AlertTitle>
              <AlertDescription>
                <Text>{error}</Text>
              </AlertDescription>
            </Alert>
          )}
          {loading ? (
            <Skeleton className="h-48" />
          ) : entries.length ? (
            entries.map((e) => (
              <article key={e.id} className="journal-entry">
                <div>
                  <Badge variant="secondary">
                    <Text>{e.mood}</Text>
                  </Badge>
                  <span className="small muted">
                    <LocalizedDate value={e.createdAt} />
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Delete reflection"
                    onClick={() => setRemove(e)}
                  >
                    <Trash2 />
                  </Button>
                </div>
                <p>{e.text}</p>
              </article>
            ))
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>
                  <Text>{"A new page."}</Text>
                </EmptyTitle>
                <EmptyDescription>
                  <Text>
                    {
                      "Your saved reflections will appear here. Start with whatever feels present."
                    }
                  </Text>
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </section>
      </div>
      <Dialog open={!!remove} onOpenChange={(v) => !v && setRemove(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Text>{"Delete this reflection?"}</Text>
            </DialogTitle>
            <DialogDescription>
              <Text>
                {
                  "This reflection will be permanently removed from your journal."
                }
              </Text>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemove(null)}>
              <Text>{"Keep reflection"}</Text>
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                try {
                  await api(`/api/journal?id=${remove?.id}`, {
                    method: "DELETE",
                  });
                  setRemove(null);
                  await load();
                  toast("Reflection removed");
                } catch (e) {
                  toast.error(String(e));
                }
              }}
            >
              <Text>{"Delete reflection"}</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
export function SavedLibrary() {
  const [saved, setSaved] = useState<SavedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  async function load() {
    try {
      setSaved(await api<SavedArticle[]>("/api/bookmarks"));
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    api<SavedArticle[]>("/api/bookmarks")
      .then(setSaved)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <div className="dashboard-heading enter">
        <div>
          <span className="eyebrow">
            <Text>{"YOUR COLLECTION OF CURIOSITY"}</Text>
          </span>
          <h1>
            <Text>{"Knowledge to "}</Text>
            <em>
              <Text>{"come back to."}</Text>
            </em>
          </h1>
          <p>
            <Text>
              {
                "Save articles from the open library and keep learning at your own pace."
              }
            </Text>
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/learn">
            <Text>{"Explore the library"}</Text>
            <ArrowUpRight data-icon="inline-end" />
          </Link>
        </Button>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>
            <Text>{"Couldn’t load saved articles"}</Text>
          </AlertTitle>
          <AlertDescription>
            <Text>{error}</Text>
          </AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Skeleton className="h-48" />
      ) : saved.length ? (
        <div className="library-grid">
          {saved.map((s) => {
            const a = articles.find((a) => a.slug === s.slug);
            return (
              a && (
                <article className="library-card" key={s.id}>
                  <Badge variant="secondary">
                    <Text>{a.category}</Text>
                  </Badge>
                  <h3>
                    <Link href={`/learn/${a.slug}`}>
                      <Text>{a.title}</Text>
                    </Link>
                  </h3>
                  <p>
                    <Text>{a.intro}</Text>
                  </p>
                  <div className="saved-chart-actions">
                    <Button asChild variant="outline">
                      <Link href={`/learn/${a.slug}`}>
                        <Text>{"Read article"}</Text>
                        <ArrowUpRight data-icon="inline-end" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove saved ${a.title}`}
                      onClick={async () => {
                        try {
                          await api(
                            "/api/bookmarks",
                            jsonOptions({ slug: a.slug }),
                          );
                          await load();
                          toast("Article removed");
                        } catch (e) {
                          toast.error(String(e));
                        }
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </article>
              )
            );
          })}
        </div>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>
              <Text>{"Make room for a good question."}</Text>
            </EmptyTitle>
            <EmptyDescription>
              <Text>
                {
                  "Open any article and choose “Save article” to start your personal library."
                }
              </Text>
            </EmptyDescription>
          </EmptyHeader>
          <Button asChild>
            <Link href="/learn">
              <Text>{"Browse free articles"}</Text>
              <ArrowUpRight data-icon="inline-end" />
            </Link>
          </Button>
        </Empty>
      )}
    </>
  );
}
export function Settings({ initialName }: { initialName: string }) {
  const router = useRouter();
  const { data: session, refetch } = authClient.useSession();
  const [keys, setKeys] = useState<{ id: string; name?: string | null }[]>([]);
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState(initialName);
  const [removeKey, setRemoveKey] = useState<string | null>(null);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");
  async function loadKeys() {
    const r = await authClient.passkey.listUserPasskeys();
    if (r.error) toast.error(r.error.message);
    else setKeys(r.data || []);
  }
  useEffect(() => {
    authClient.passkey.listUserPasskeys().then((r) => {
      if (r.error) toast.error(r.error.message);
      else setKeys(r.data || []);
    });
  }, []);
  return (
    <>
      <div className="dashboard-heading enter">
        <div>
          <span className="eyebrow">
            <Text>{"MAKE YOURSELF AT HOME"}</Text>
          </span>
          <h1>
            <Text>{"Your account. "}</Text>
            <em>
              <Text>{"Your choices."}</Text>
            </em>
          </h1>
          <p>
            <Text>
              {"Manage your profile, sign-in methods, and personal data."}
            </Text>
          </p>
        </div>
      </div>
      <div className="settings-grid">
        <section className="settings-panel">
          <h2>
            <Text>{"Your profile"}</Text>
          </h2>
          <p className="muted">{session?.user.email}</p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              const r = await authClient.updateUser({ name });
              if (r.error) toast.error(r.error.message);
              else {
                toast.success("Name updated");
                refetch();
              }
              setBusy(false);
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="profile-name">
                  <Text>{"Display name"}</Text>
                </FieldLabel>
                <Input
                  id="profile-name"
                  value={name}
                  maxLength={80}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Field>
              <Button disabled={busy}>
                <Text>{"Save profile"}</Text>
              </Button>
            </FieldGroup>
          </form>
          {!session?.user.emailVerified && (
            <div className="verification-notice">
              <p className="small">
                <Text>{"Your email has not been verified yet."}</Text>
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  const r = await authClient.sendVerificationEmail({
                    email: session!.user.email,
                    callbackURL: "/verify-email?verified=1",
                  });
                  if (r.error) toast.error(r.error.message);
                  else toast.success("Verification email sent");
                }}
              >
                <Text>{"Send verification link"}</Text>
              </Button>
            </div>
          )}
        </section>
        <section className="settings-panel">
          <h2>
            <Text>{"Passkeys"}</Text>
          </h2>
          <p>
            <Text>
              {
                "Log in with your fingerprint, face, device PIN, or security key. Your private key stays with your authenticator."
              }
            </Text>
          </p>
          <Button
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                if (!window.PublicKeyCredential)
                  throw new Error("This browser does not support passkeys.");
                const r = await authClient.passkey.addPasskey({
                  name: "My Asteria passkey",
                });
                if (r.error) throw new Error(r.error.message);
                toast.success("Passkey registered");
                await loadKeys();
              } catch (e) {
                toast.error(
                  e instanceof Error ? e.message : "Unable to register passkey",
                );
              } finally {
                setBusy(false);
              }
            }}
          >
            <Fingerprint data-icon="inline-start" />
            <Text>{"Add a passkey"}</Text>
          </Button>
          {keys.map((k) => (
            <div className="passkey-row" key={k.id}>
              <span>
                <Text>{k.name || "Asteria passkey"}</Text>
              </span>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Remove ${k.name || "passkey"}`}
                onClick={() => setRemoveKey(k.id)}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
          {!keys.length && (
            <p className="small muted">
              <Text>
                {
                  "No passkeys registered yet. Register on the domain you use to log in."
                }
              </Text>
            </p>
          )}
        </section>
        <section className="settings-panel">
          <h2>
            <Text>{"Change password"}</Text>
          </h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const f = new FormData(form);
              setBusy(true);
              const r = await authClient.changePassword({
                currentPassword: String(f.get("current")),
                newPassword: String(f.get("next")),
                revokeOtherSessions: true,
              });
              if (r.error) toast.error(r.error.message);
              else {
                toast.success("Password changed; other sessions signed out");
                form.reset();
              }
              setBusy(false);
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="current-password">
                  <Text>{"Current password"}</Text>
                </FieldLabel>
                <Input
                  id="current-password"
                  type="password"
                  name="current"
                  autoComplete="current-password"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="next-password">
                  <Text>{"New password"}</Text>
                </FieldLabel>
                <Input
                  id="next-password"
                  type="password"
                  name="next"
                  autoComplete="new-password"
                  minLength={12}
                  maxLength={128}
                  required
                />
              </Field>
              <Button disabled={busy}>
                <Text>{"Update password"}</Text>
              </Button>
            </FieldGroup>
          </form>
        </section>
        <section className="settings-panel">
          <h2>
            <Text>{"Your data belongs to you."}</Text>
          </h2>
          <p>
            <Text>
              {
                "Export your saved chart details, reflections, and bookmarks as JSON. Store the download privately."
              }
            </Text>
          </p>
          <Button
            variant="outline"
            onClick={async () => {
              try {
                const [charts, journal, bookmarks] = await Promise.all([
                  api("/api/charts"),
                  api("/api/journal"),
                  api("/api/bookmarks"),
                ]);
                const url = URL.createObjectURL(
                  new Blob(
                    [
                      JSON.stringify(
                        {
                          exportedAt: new Date().toISOString(),
                          user: session?.user,
                          charts,
                          journal,
                          bookmarks,
                        },
                        null,
                        2,
                      ),
                    ],
                    { type: "application/json" },
                  ),
                );
                const a = document.createElement("a");
                a.href = url;
                a.download = "asteria-my-data.json";
                a.click();
                URL.revokeObjectURL(url);
              } catch (e) {
                toast.error(String(e));
              }
            }}
          >
            <Download data-icon="inline-start" />
            <Text>{"Export my data"}</Text>
          </Button>
          <div className="danger-zone">
            <h3>
              <Text>{"Delete account"}</Text>
            </h3>
            <p className="small">
              <Text>
                {
                  "Remove your account, charts, journal, bookmarks, and passkeys. This cannot be undone."
                }
              </Text>
            </p>
            <Button
              variant="destructive"
              onClick={() => setDeleteAccount(true)}
            >
              <Text>{"Delete my account"}</Text>
            </Button>
          </div>
        </section>
      </div>
      <Dialog open={!!removeKey} onOpenChange={(v) => !v && setRemoveKey(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Text>{"Remove this passkey?"}</Text>
            </DialogTitle>
            <DialogDescription>
              <Text>
                {"You can continue signing in with your email and password."}
              </Text>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemoveKey(null)}>
              <Text>{"Keep passkey"}</Text>
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                const r = await authClient.passkey.deletePasskey({
                  id: removeKey!,
                });
                if (r.error) toast.error(r.error.message);
                else {
                  setRemoveKey(null);
                  await loadKeys();
                  toast("Passkey removed");
                }
              }}
            >
              <Text>{"Remove passkey"}</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={deleteAccount} onOpenChange={setDeleteAccount}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Text>{"Delete your Asteria account?"}</Text>
            </DialogTitle>
            <DialogDescription>
              <Text>
                {
                  "Your account and all saved data will be permanently deleted. Confirm with your password and type DELETE."
                }
              </Text>
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="delete-password">
                <Text>{"Current password"}</Text>
              </FieldLabel>
              <Input
                id="delete-password"
                type="password"
                autoComplete="current-password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="delete-confirm">
                <Text>{"Type DELETE"}</Text>
              </FieldLabel>
              <Input
                id="delete-confirm"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteAccount(false)}>
              <Text>{"Keep my account"}</Text>
            </Button>
            <Button
              variant="destructive"
              disabled={deleteConfirm !== "DELETE" || !deletePassword || busy}
              onClick={async () => {
                setBusy(true);
                const r = await authClient.deleteUser({
                  password: deletePassword,
                });
                if (r.error) {
                  toast.error(r.error.message);
                  setBusy(false);
                } else {
                  router.push("/");
                  router.refresh();
                }
              }}
            >
              <Text>{"Permanently delete"}</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
