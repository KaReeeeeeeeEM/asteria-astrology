"use client";
import Image from "next/image";
import type { ComponentProps } from "react";
import { useLanguage } from "./language";
export default function LocalizedImage(props: ComponentProps<typeof Image>) {
  const { t } = useLanguage();
  return <Image {...props} alt={t(props.alt)} />;
}
