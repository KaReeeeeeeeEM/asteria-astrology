import { localizedMetadata } from "@/i18n/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionUser } from "@/lib/api";
import { DashboardShell } from "@/components/dashboard-shell";
export const dynamic = "force-dynamic";
const pageMetadata = { title: "Your personal dashboard" };
export async function generateMetadata() {
  return localizedMetadata(pageMetadata);
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await sessionUser();
  if (!user) redirect("/signin");
  return (
    <DashboardShell
      name={user.name}
      email={user.email}
      defaultOpen={(await cookies()).get("sidebar_state")?.value !== "false"}
    >
      {children}
    </DashboardShell>
  );
}
