import { PageHeading } from "@/components/page-heading";
import { Library } from "@/components/library";
export const metadata = {
  title: "The astrology library",
  description:
    "A free, searchable guide to planets, houses, aspects, lunar cycles, and astrological traditions.",
};
export default function Learn() {
  return (
    <main className="container public-main">
      <PageHeading
        eyebrow="THE OPEN LIBRARY"
        title="A universe of understanding."
        description="Follow a question, learn a new language, or find a different perspective. Your curiosity belongs here."
      />
      <Library />
    </main>
  );
}
