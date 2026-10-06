import "server-only";
import { headers } from "next/headers";
import { getAuth } from "./auth";
export async function sessionUser() {
  return (await getAuth().api.getSession({ headers: await headers() }))?.user;
}
export async function requireUser() {
  const u = await sessionUser();
  if (!u) throw new Error("UNAUTHORIZED");
  return u;
}
export function apiError(error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown error";
  if (message === "UNAUTHORIZED")
    return Response.json(
      { error: "Please sign in to continue." },
      { status: 401 },
    );
  console.error(
    "API operation failed:",
    error instanceof Error ? error.name : "Unknown",
  );
  return Response.json(
    { error: "Unable to complete this request. Please try again." },
    { status: 500 },
  );
}
export function validOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return (
    origin === new URL(request.url).origin ||
    origin === process.env.BETTER_AUTH_URL
  );
}
