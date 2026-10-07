import { localizedMetadata } from "@/i18n/server";
import Content from "@/components/pages/learn-content";
const pageMetadata = {
  title: "The astrology library",
  description:
    "A free, searchable guide to planets, houses, aspects, lunar cycles, and astrological traditions.",
};
export async function generateMetadata() {
  return localizedMetadata(pageMetadata);
}

export default function Page() {
  return (
    <main className="container public-main">
      <Content />
    </main>
  );
}
