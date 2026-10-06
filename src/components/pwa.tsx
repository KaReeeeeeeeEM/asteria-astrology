"use client";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
};
export function PWAInstall() {
  const [prompt, setPrompt] = useState<InstallEvent | null>(null);
  const [help, setHelp] = useState(false);
  useEffect(() => {
    if ("serviceWorker" in navigator)
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    const listener = (e: Event) => {
      e.preventDefault();
      setPrompt(e as InstallEvent);
    };
    window.addEventListener("beforeinstallprompt", listener);
    return () => window.removeEventListener("beforeinstallprompt", listener);
  }, []);
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={async () => {
          if (prompt) {
            await prompt.prompt();
            const result = await prompt.userChoice;
            if (result.outcome === "accepted") setPrompt(null);
          } else setHelp(!help);
        }}
      >
        <Download data-icon="inline-start" />
        Install app
      </Button>
      {help && (
        <p className="install-help" role="status">
          On iPhone, use Share → Add to Home Screen. On desktop or Android, use
          your browser’s install option. If already installed, open Asteria from
          your apps.
        </p>
      )}
    </>
  );
}
