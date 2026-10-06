import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="container loading-page" aria-label="Loading page">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-20 w-3/4" />
      <Skeleton className="h-72 w-full" />
    </div>
  );
}
