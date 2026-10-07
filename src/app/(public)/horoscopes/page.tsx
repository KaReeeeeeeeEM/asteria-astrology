import { localizedMetadata } from "@/i18n/server";
import Content from "@/components/pages/horoscopes-content";
export const revalidate = 3600;
const pageMetadata = { title: "Your daily astrology reading" };
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
