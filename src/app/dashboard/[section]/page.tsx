import {sessionUser} from '@/lib/api';
import { notFound } from "next/navigation";
import {
  SavedCharts,
  Journal,
  SavedLibrary,
  Settings,
} from "@/components/dashboard-features";
export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (section === "charts") return <SavedCharts />;
  if (section === "journal") return <Journal />;
  if (section === "library") return <SavedLibrary />;
  if (section === "settings") return <Settings initialName={(await sessionUser())!.name} />;
  notFound();
}
