import { localizedMetadata } from "@/i18n/server";
import Content from "@/components/pages/compatibility-content";
const pageMetadata = { title: "Astrology compatibility & synastry" };
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
