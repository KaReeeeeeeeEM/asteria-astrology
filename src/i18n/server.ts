import "server-only";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { translate } from "./translation";
export async function localizedMetadata(metadata: Metadata): Promise<Metadata> {
  const sw = (await cookies()).get("asteria_language")?.value === "sw";
  if (!sw) return metadata;
  const catalog = (await import("./sw.json")).default;
  const t = (text: string) => translate(text, "sw", catalog);
  const title =
    typeof metadata.title === "string"
      ? t(metadata.title)
      : metadata.title && "default" in metadata.title
        ? { ...metadata.title, default: t(metadata.title.default) }
        : metadata.title;
  return {
    ...metadata,
    title,
    description: metadata.description
      ? t(metadata.description)
      : metadata.description,
  };
}
