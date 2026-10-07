"use client";
import { useLocalizedProps } from "@/components/language-context";

import { cn } from "cn";
import { Loader2Icon } from "lucide-react";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  props = useLocalizedProps({ "aria-label": "Loading", ...props });

  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
