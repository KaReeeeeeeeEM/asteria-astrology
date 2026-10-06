import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <main className="error-page">
      <Logo />
      <span className="eyebrow">A SMALL DETOUR</span>
      <h1>
        This star is a little
        <br />
        <em>off the map.</em>
      </h1>
      <p>We couldn’t find that page. Your next discovery is still waiting.</p>
      <Button asChild>
        <Link href="/">Return to Asteria</Link>
      </Button>
    </main>
  );
}
