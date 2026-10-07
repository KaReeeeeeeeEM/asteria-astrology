import { localizedMetadata } from "@/i18n/server";
import Content from "@/components/pages/numerology-content";
const pageMetadata = {
  title: "Numerology readings & reader’s desk",
  description:
    "Detailed life-path, birthday and personal-year readings, a twelve-number reference, and a practical handbook for learning to give numerology readings.",
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
