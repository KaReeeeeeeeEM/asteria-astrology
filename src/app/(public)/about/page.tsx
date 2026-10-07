import { localizedMetadata } from "@/i18n/server";
import Content from "@/components/pages/about-content";
const pageMetadata = { title: "About Asteria" };
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
