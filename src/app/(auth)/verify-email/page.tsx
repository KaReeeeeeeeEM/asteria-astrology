import { PageLoading } from "@/components/page-loading";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
export const metadata = { title: "Verify Email" };
export default function Page() {
  return (
    <Suspense fallback={<PageLoading />}>
      <AuthForm mode="verify-email" />
    </Suspense>
  );
}
