import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
export const metadata = { title: "Forgot Password" };
export default function Page() {
  return (
    <Suspense fallback={<p>Opening Asteria…</p>}>
      <AuthForm mode="forgot-password" />
    </Suspense>
  );
}
