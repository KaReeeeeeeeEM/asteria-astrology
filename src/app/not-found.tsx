import { Text } from "@/components/language";
import Link from "@/components/app-link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <main className="error-page">
      <Logo />
      <span className="eyebrow">
        <Text>{"A SMALL DETOUR"}</Text>
      </span>
      <h1>
        <Text>{"This star is a little"}</Text>
        <br />
        <em>
          <Text>{"off the map."}</Text>
        </em>
      </h1>
      <p>
        <Text>
          {"We couldn’t find that page. Your next discovery is still waiting."}
        </Text>
      </p>
      <Button asChild>
        <Link href="/">
          <Text>{"Return to Asteria"}</Text>
        </Link>
      </Button>
    </main>
  );
}
