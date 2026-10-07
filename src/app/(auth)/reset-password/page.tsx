import { localizedMetadata } from "@/i18n/server";
import { PageLoading } from "@/components/page-loading";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
const pageMetadata = { title: "Reset Password" };
export async function generateMetadata() {
  return localizedMetadata(pageMetadata);
}

export default function Page() {
  return (
    <Suspense fallback={<PageLoading />}>
      <AuthForm mode="reset-password" />
    </Suspense>
  );
}
