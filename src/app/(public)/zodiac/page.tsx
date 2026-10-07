import { localizedMetadata } from "@/i18n/server";
import Content from "@/components/pages/zodiac-content";
const pageMetadata = { title: "The twelve zodiac signs" };
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
