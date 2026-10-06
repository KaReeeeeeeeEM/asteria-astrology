import { PageHeading } from "@/components/page-heading";
import { ChartTool } from "@/components/chart-tool";
export const metadata = {
  title: "Free birth chart calculator",
  description:
    "Calculate your Sun, Moon, rising sign, ten planets, aspects, and whole-sign houses for free.",
};
export default function ChartPage() {
  return (
    <main className="container public-main">
      <PageHeading
        eyebrow="YOUR NATAL CHART"
        title="Meet your celestial blueprint."
        description="A map for reflection, a new perspective, and a place to begin. No account needed."
      />
      <ChartTool />
    </main>
  );
}
