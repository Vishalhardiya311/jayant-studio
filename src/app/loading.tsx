import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] space-y-8 p-4">
      <div className="text-center space-y-2">
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-6 w-80 mx-auto" />
      </div>
      <div className="w-full max-w-4xl space-y-6">
        <Skeleton className="h-10 w-1/2 mx-auto" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-60 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
