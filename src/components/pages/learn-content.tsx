import { Text } from "@/components/language";
import { LearningFriends } from "@/components/cartoons";
import { PageHeading } from "@/components/page-heading";
import { Library } from "@/components/library";
export const metadata = {
  title: "The astrology library",
  description:
    "A free, searchable guide to planets, houses, aspects, lunar cycles, and astrological traditions.",
};
export default function Learn() {
  return (
    <section className="dashboard-tool-content">
      <PageHeading
        eyebrow="THE OPEN LIBRARY"
        title="A universe of understanding."
        description="Follow a question, learn a new language, or find a different perspective. Your curiosity belongs here."
      />
      <div className="library-welcome">
        <LearningFriends />
        <div>
          <h2>
            <Text>{"A curious mind is a beautiful thing."}</Text>
          </h2>
          <p>
            <Text>
              {
                "Meet the planets, connect the patterns, and learn at your own pace."
              }
            </Text>
          </p>
        </div>
      </div>
      <Library />
    </section>
  );
}
