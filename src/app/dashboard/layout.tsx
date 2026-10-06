import { redirect } from "next/navigation";
import { sessionUser } from "@/lib/api";
import { DashboardShell } from "@/components/dashboard-shell";
export const dynamic = "force-dynamic";
export const metadata = { title: "Your personal dashboard" };
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await sessionUser();
  if (!user) redirect("/signin");
  return (
    <DashboardShell name={user.name} email={user.email}>
      {children}
    </DashboardShell>
  );
}
