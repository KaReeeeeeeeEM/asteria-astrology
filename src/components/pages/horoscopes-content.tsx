import { Text } from "@/components/language";
import { Suspense } from "react";
import { PageHeading } from "@/components/page-heading";
import { Horoscopes } from "@/components/horoscopes";
export const revalidate = 3600;
export const metadata = { title: "Your daily astrology reading" };
export default function Page() {
  return (
    <section className="dashboard-tool-content">
      <PageHeading
        eyebrow="A MOMENT FOR TODAY"
        title="Let a little perspective in."
        description="Choose your sign. Meet the day with curiosity, a small intention, and room for possibility."
      />
      <Suspense
        fallback={
          <p>
            <Text>{"Preparing today’s reading…"}</Text>
          </p>
        }
      >
        <Horoscopes date={new Date().toISOString()} />
      </Suspense>
    </section>
  );
}
