import { PageHeading } from "@/components/page-heading";
import { Numerology } from "@/components/numerology";
export const metadata = {
  title: "Numerology readings & reader’s desk",
  description:
    "Detailed life-path, birthday and personal-year readings, a twelve-number reference, and a practical handbook for learning to give numerology readings.",
};
export default function Page() {
  return (
    <section className="dashboard-tool-content">
      <PageHeading
        eyebrow="THE NUMEROLOGY READER’S DESK"
        title="Your numbers. A deeper story."
        description="Explore a detailed reading, understand the reasoning, and learn to interpret life paths, birthday talents and yearly cycles."
      />
      <Numerology />
    </section>
  );
}
