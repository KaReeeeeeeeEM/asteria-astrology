import { localizedMetadata } from "@/i18n/server";
import NumerologyContent from "@/components/pages/numerology-content";
import CompatibilityContent from "@/components/pages/compatibility-content";
import SkyContent from "@/components/pages/sky-content";
import HoroscopesContent from "@/components/pages/horoscopes-content";
import LearnContent from "@/components/pages/learn-content";
import ZodiacContent from "@/components/pages/zodiac-content";
import PrivacyContent from "@/components/pages/privacy-content";
import TermsContent from "@/components/pages/terms-content";
import AboutContent from "@/components/pages/about-content";
import { sessionUser } from "@/lib/api";
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
  if (section === "settings")
    return <Settings initialName={(await sessionUser())!.name} />;
  if (section === "numerology") return <NumerologyContent />;
  if (section === "compatibility") return <CompatibilityContent />;
  if (section === "sky") return <SkyContent />;
  if (section === "horoscopes") return <HoroscopesContent />;
  if (section === "learn") return <LearnContent />;
  if (section === "zodiac") return <ZodiacContent />;
  if (section === "privacy") return <PrivacyContent />;
  if (section === "terms") return <TermsContent />;
  if (section === "about") return <AboutContent />;
  notFound();
}

const titles: Record<string, string> = {
  charts: "My birth charts",
  journal: "My journal",
  library: "Saved knowledge",
  settings: "Settings",
  numerology: "Numerology",
  compatibility: "Compatibility",
  sky: "Today’s sky",
  horoscopes: "Daily readings",
  learn: "Astrology library",
  zodiac: "Zodiac signs",
  privacy: "Privacy & your data",
  terms: "Terms of use",
  about: "About Asteria",
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  return localizedMetadata({
    title: titles[(await params).section] || "Your personal dashboard",
  });
}
