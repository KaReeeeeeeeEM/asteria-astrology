import { PageHeading } from "@/components/page-heading";
import { Compatibility } from "@/components/compatibility";
export const metadata = { title: "Astrology compatibility & synastry" };
export default function Page() {
  return (
    <main className="container public-main">
      <PageHeading
        eyebrow="THE SPACE BETWEEN US"
        title="Connection, with curiosity."
        description="Two people. Two perspectives. A gentle lens for understanding each other, never a verdict on a relationship."
      />
      <Compatibility />
    </main>
  );
}
