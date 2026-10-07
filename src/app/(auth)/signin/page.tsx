import { PageLoading } from "@/components/page-loading";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
export const metadata = { title: "Signin" };
export default function Page() {
  return (
    <Suspense fallback={<PageLoading />}>
      <AuthForm mode="signin" />
    </Suspense>
  );
}
