import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
export const metadata = { title: "Reset Password" };
export default function Page() {
  return (
    <Suspense fallback={<p>Opening Asteria…</p>}>
      <AuthForm mode="reset-password" />
    </Suspense>
  );
}
