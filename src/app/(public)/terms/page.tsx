import { localizedMetadata } from "@/i18n/server";
import Content from "@/components/pages/terms-content";
const pageMetadata = { title: "Terms of use" };
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
