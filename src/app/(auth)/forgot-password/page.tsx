import { localizedMetadata } from "@/i18n/server";
import { PageLoading } from "@/components/page-loading";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
const pageMetadata = { title: "Forgot Password" };
export async function generateMetadata() {
  return localizedMetadata(pageMetadata);
}

export default function Page() {
  return (
    <Suspense fallback={<PageLoading />}>
      <AuthForm mode="forgot-password" />
    </Suspense>
  );
}
