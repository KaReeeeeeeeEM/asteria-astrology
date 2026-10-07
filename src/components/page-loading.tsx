import { Spinner } from "@/components/ui/spinner";

export function PageLoading() {
  return (
    <div className="page-loading">
      <Spinner className="size-8" aria-label="Loading page" />
    </div>
  );
}
