import { localizedMetadata } from "@/i18n/server";
import Content from "@/components/pages/privacy-content";
const pageMetadata = { title: "Privacy & your data" };
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
