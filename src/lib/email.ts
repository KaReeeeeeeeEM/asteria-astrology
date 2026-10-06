import "server-only";
import { createHash } from "node:crypto";
export async function sendEmail(to: string, subject: string, text: string) {
  if (!process.env.EASYMAIL_API_KEY)
    throw new Error(
      "Email delivery is not configured. Please contact the site owner.",
    );
  const key = createHash("sha256")
    .update(`${to}:${subject}:${text}`)
    .digest("hex");
  const response = await fetch("https://easymail-nu.vercel.app/api/v1/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.EASYMAIL_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `asteria-${key}`,
    },
    body: JSON.stringify({ to, subject, text }),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok)
    throw new Error(`Email provider rejected delivery (${response.status})`);
}
