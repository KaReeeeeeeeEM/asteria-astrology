"use client";
import { useLocalizedProps } from "@/components/language-context";
import { cn } from "cn";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  props = useLocalizedProps(props);

  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
