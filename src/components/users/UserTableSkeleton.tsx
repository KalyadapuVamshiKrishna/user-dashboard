import { Skeleton } from "@/components/ui/skeleton";

export function UserTableSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Row Skeleton */}
      <div className="flex items-center justify-between pb-4 border-b">
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-6 w-[100px]" />
        <Skeleton className="h-6 w-[100px]" />
      </div>

      {/* Table Rows Skeletons */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-2">
          <Skeleton className="h-12 w-12 rounded-full" /> {/* Avatar area */}
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      ))}
    </div>
  );
}