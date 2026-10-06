"use client";
import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
export function BookmarkButton({ slug }: { slug: string }) {
  const { data } = authClient.useSession();
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (data)
      fetch("/api/bookmarks")
        .then((r) => r.json())
        .then(
          (b) => Array.isArray(b) && setSaved(b.some((x) => x.slug === slug)),
        )
        .catch(() => {});
  }, [data, slug]);
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={busy}
      onClick={async () => {
        if (!data) {
          toast("Sign in to save articles to your library.");
          return;
        }
        setBusy(true);
        try {
          const r = await fetch("/api/bookmarks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug }),
          });
          const b = await r.json();
          if (!r.ok) throw new Error(b.error);
          setSaved(b.saved);
          toast(
            b.saved ? "Saved to your library" : "Removed from saved articles",
          );
        } catch (e) {
          toast.error(e instanceof Error ? e.message : "Unable to save");
        } finally {
          setBusy(false);
        }
      }}
    >
      <Bookmark
        data-icon="inline-start"
        fill={saved ? "currentColor" : "none"}
      />
      {saved ? "Saved" : "Save article"}
    </Button>
  );
}
