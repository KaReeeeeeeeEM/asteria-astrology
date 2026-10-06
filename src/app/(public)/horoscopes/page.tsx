import { Suspense } from "react";
import { PageHeading } from "@/components/page-heading";
import { Horoscopes } from "@/components/horoscopes";
export const revalidate = 3600;
export const metadata = { title: "Your daily astrology reading" };
export default function Page() {
  return (
    <main className="container public-main">
      <PageHeading
        eyebrow="A MOMENT FOR TODAY"
        title="Let a little perspective in."
        description="Choose your sign. Meet the day with curiosity, a small intention, and room for possibility."
      />
      <Suspense fallback={<p>Preparing today’s reading…</p>}>
        <Horoscopes date={new Date().toISOString()} />
      </Suspense>
    </main>
  );
}
