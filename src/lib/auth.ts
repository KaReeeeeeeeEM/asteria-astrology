import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { passkey } from "@better-auth/passkey";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { sendEmail } from "./email";
let instance: ReturnType<typeof makeAuth> | undefined;
function makeAuth() {
  const baseURL = process.env.BETTER_AUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  if (!process.env.BETTER_AUTH_SECRET)
    throw new Error("BETTER_AUTH_SECRET is not configured");
  return betterAuth({
    appName: "Asteria",
    baseURL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(db(), { provider: "pg", schema }),
    trustedOrigins: [baseURL],
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 12,
      maxPasswordLength: 128,
      requireEmailVerification: false,
      sendResetPassword: async ({ user, url }) =>
        sendEmail(
          user.email,
          "Reset your Asteria password",
          `Reset your password using this link:\n${url}\n\nIf you did not request this, you can ignore this email.`,
        ),
    },
    emailVerification: {
      sendOnSignUp: !!process.env.EASYMAIL_API_KEY,
      autoSignInAfterVerification: false,
      sendVerificationEmail: async ({ user, url }) =>
        sendEmail(
          user.email,
          "Welcome to Asteria — verify your email",
          `Welcome to Asteria. Confirm your email address:\n${url}\n\nIf you did not create this account, you can ignore this email.`,
        ),
    },
    session: { expiresIn: 60 * 60 * 24 * 7, updateAge: 60 * 60 * 24 },
    rateLimit: {
      enabled: true,
      storage: "database",
      window: 60,
      max: 60,
      customRules: {
        "/sign-in/email": { window: 60, max: 8 },
        "/sign-up/email": { window: 60, max: 5 },
        "/request-password-reset": { window: 60, max: 3 },
      },
    },
    user: { deleteUser: { enabled: true } },
    plugins: [
      passkey({
        rpID: new URL(baseURL).hostname,
        rpName: "Asteria",
        origin: baseURL,
      }),
      nextCookies(),
    ],
  });
}
export function getAuth() {
  return (instance ??= makeAuth());
}
