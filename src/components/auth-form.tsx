"use client";
import { Text } from "@/components/language";

import { useState } from "react";
import Link from "@/components/app-link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  Fingerprint,
  ArrowUpRight,
  LoaderCircle,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "./ui/input-group";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "./ui/field";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Separator } from "./ui/separator";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language";
import { ThemeToggle } from "./theme";
import { LearningFriends } from "./cartoons";

type Mode =
  | "signup"
  | "signin"
  | "forgot-password"
  | "reset-password"
  | "verify-email";
const content = {
  signup: {
    title: "A little closer to yourself.",
    description:
      "Create your free account. Your own corner of the cosmos is waiting.",
    button: "Create my account",
  },
  signin: {
    title: "Welcome back to your orbit.",
    description: "Your chart, your reflections, and a little space for you.",
    button: "Log in",
  },
  "forgot-password": {
    title: "Find your way back.",
    description: "We’ll send a secure link to reset your password.",
    button: "Send reset link",
  },
  "reset-password": {
    title: "A fresh beginning.",
    description: "Choose a new password for your Asteria account.",
    button: "Reset password",
  },
  "verify-email": {
    title: "Confirm your corner of the cosmos.",
    description: "Verify your email to keep your account reachable.",
    button: "Send verification email",
  },
};
export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const c = content[mode];
  const search = useSearchParams();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || "").trim();
    const password = String(f.get("password") || "");
    try {
      if (mode === "signup") {
        const r = await authClient.signUp.email({
          email,
          password,
          name: email.split("@")[0],
          callbackURL: "/dashboard",
        });
        if (r.error) throw new Error(r.error.message);
        router.push("/dashboard");
        router.refresh();
      } else if (mode === "signin") {
        const r = await authClient.signIn.email({ email, password });
        if (r.error) throw new Error(r.error.message);
        router.push("/dashboard");
        router.refresh();
      } else if (mode === "forgot-password") {
        const r = await authClient.requestPasswordReset({
          email,
          redirectTo: "/reset-password",
        });
        if (r.error) throw new Error(r.error.message);
        setSuccess(
          "If an account exists for that address, a reset link is on its way. Check your inbox and spam folder.",
        );
      } else if (mode === "reset-password") {
        const token = search.get("token");
        if (!token)
          throw new Error(
            "This reset link is missing its token. Request a new link.",
          );
        const r = await authClient.resetPassword({
          newPassword: password,
          token,
        });
        if (r.error) throw new Error(r.error.message);
        setSuccess("Your password is reset. You can now log in.");
      } else {
        const r = await authClient.sendVerificationEmail({
          email,
          callbackURL: "/verify-email?verified=1",
        });
        if (r.error) throw new Error(r.error.message);
        setSuccess(
          "A verification link has been sent. Check your inbox and spam folder.",
        );
      }
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Unable to complete this request. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function passkey() {
    setBusy(true);
    setError("");
    try {
      if (!window.PublicKeyCredential)
        throw new Error(
          "Passkeys are unavailable in this browser. Please use your email and password.",
        );
      const r = await authClient.signIn.passkey();
      if (r.error)
        throw new Error(r.error.message || "The passkey prompt was canceled.");
      router.push("/dashboard");
      router.refresh();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Could not sign in with a passkey.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="auth-layout">
      <section className="auth-story">
        <div className="auth-theme">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        <Logo />
        <div>
          <span className="eyebrow">
            <Text>{"A GUIDE, NOT A DESTINATION"}</Text>
          </span>
          <h2>
            <Text>{"The sky is a mirror."}</Text>
            <br />
            <em>
              <Text>{"You are the story."}</Text>
            </em>
          </h2>
          <LearningFriends />
        </div>
        <p>
          <Text>{"Free to explore. Room to be yourself."}</Text>
        </p>
      </section>
      <section className="auth-form-side">
        <div className="auth-mobile-controls">
          <LanguageSwitcher compact />
          <ThemeToggle />
        </div>
        <Link href="/" className="auth-back">
          <Text>{"← Back to Asteria"}</Text>
        </Link>
        <div className="auth-form-inner enter">
          <span className="eyebrow">
            ✦<Text> </Text>
            <Text>
              {mode === "signup"
                ? "BEGIN YOUR JOURNEY"
                : "YOUR CORNER OF THE COSMOS"}
            </Text>
          </span>
          <h1>
            <Text>{c.title}</Text>
          </h1>
          <p>
            <Text>{c.description}</Text>
          </p>
          {mode === "verify-email" && search.get("verified") === "1" ? (
            <Alert>
              <Check />
              <AlertTitle>
                <Text>{"Email verified"}</Text>
              </AlertTitle>
              <AlertDescription>
                <Text>
                  {"Thank you. Your account’s email address is confirmed."}
                </Text>
                <Text> </Text>
                <Link href="/dashboard">
                  <Text>{"Continue to your dashboard."}</Text>
                </Link>
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={submit}>
              <FieldGroup>
                {mode !== "reset-password" && (
                  <Field>
                    <FieldLabel htmlFor="email">
                      <Text>{"Email address"}</Text>
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="username webauthn"
                        placeholder="you@example.com"
                        required
                        maxLength={254}
                      />
                    </InputGroup>
                  </Field>
                )}
                {(mode === "signup" ||
                  mode === "signin" ||
                  mode === "reset-password") && (
                  <Field>
                    <div className="password-label">
                      <FieldLabel htmlFor="password">
                        <Text>
                          {mode === "reset-password"
                            ? "New password"
                            : "Password"}
                        </Text>
                      </FieldLabel>
                      {mode === "signin" && (
                        <Link href="/forgot-password">
                          <Text>{"Forgot password?"}</Text>
                        </Link>
                      )}
                    </div>
                    <InputGroup>
                      <InputGroupInput
                        id="password"
                        name="password"
                        type={show ? "text" : "password"}
                        autoComplete={
                          mode === "signin"
                            ? "current-password"
                            : "new-password"
                        }
                        minLength={mode === "signin" ? 1 : 12}
                        maxLength={128}
                        required
                        placeholder={
                          mode === "signup"
                            ? "At least 12 characters"
                            : "Your password"
                        }
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => setShow(!show)}
                          aria-label={show ? "Hide password" : "Show password"}
                        >
                          {show ? <EyeOff /> : <Eye />}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                    {mode !== "signin" && (
                      <FieldDescription>
                        <Text>
                          {
                            "Use at least 12 characters. A unique passphrase works well."
                          }
                        </Text>
                      </FieldDescription>
                    )}
                  </Field>
                )}
                {error && (
                  <Alert variant="destructive" role="alert">
                    <AlertTitle>
                      <Text>{"Let’s try that again"}</Text>
                    </AlertTitle>
                    <AlertDescription>
                      <Text>{error}</Text>
                    </AlertDescription>
                  </Alert>
                )}
                {success && (
                  <Alert role="status">
                    <AlertTitle>
                      <Text>{"You’re all set"}</Text>
                    </AlertTitle>
                    <AlertDescription>
                      <Text>{success}</Text>
                    </AlertDescription>
                  </Alert>
                )}
                <Button type="submit" size="lg" disabled={busy}>
                  {busy ? (
                    <LoaderCircle
                      className="animate-spin"
                      data-icon="inline-start"
                    />
                  ) : (
                    <ArrowUpRight data-icon="inline-end" />
                  )}
                  <Text>{busy ? "One moment…" : c.button}</Text>
                </Button>
              </FieldGroup>
            </form>
          )}
          {mode === "signin" && (
            <>
              <div className="auth-divider">
                <Separator />
                <span>
                  <Text>{"or return with a passkey"}</Text>
                </span>
                <Separator />
              </div>
              <Button
                variant="outline"
                size="lg"
                disabled={busy}
                onClick={passkey}
              >
                <Fingerprint data-icon="inline-start" />
                <Text>{"Log in with a passkey"}</Text>
              </Button>
              <p className="small muted">
                <Text>
                  {
                    "Register a passkey in your dashboard after creating an account."
                  }
                </Text>
              </p>
            </>
          )}
          {mode === "signup" && (
            <p className="auth-legal">
              <Text>{"By creating an account, you agree to our"}</Text>
              <Text> </Text>
              <Link href="/terms">
                <Text>{"Terms"}</Text>
              </Link>
              <Text>{"and"}</Text>
              <Text> </Text>
              <Link href="/privacy">
                <Text>{"Privacy Policy"}</Text>
              </Link>
              .
            </p>
          )}
          <p className="auth-switch">
            {mode === "signup" ? (
              <>
                <Text>{"Already have an account? "}</Text>
                <Link href="/signin">
                  <Text>{"Log in"}</Text>
                </Link>
              </>
            ) : mode === "signin" ? (
              <>
                <Text>{"New to Asteria?"}</Text>
                <Text> </Text>
                <Link href="/signup">
                  <Text>{"Create a free account"}</Text>
                </Link>
              </>
            ) : (
              <Link href="/signin">
                <Text>{"Return to log in"}</Text>
              </Link>
            )}
          </p>
        </div>
        <span className="auth-bottom">
          <Text>{"ALWAYS FREE. ALWAYS YOURS."}</Text>
        </span>
      </section>
    </main>
  );
}
