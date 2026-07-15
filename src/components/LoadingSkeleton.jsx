export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3 px-6 py-5" aria-hidden="true">
      <div className="skeleton-shimmer h-4 w-2/3 rounded-md" />
      <div className="skeleton-shimmer h-3 w-full rounded-md" />
      <div className="skeleton-shimmer h-3 w-11/12 rounded-md" />
      <div className="skeleton-shimmer h-3 w-4/5 rounded-md" />
      <div className="mt-2 skeleton-shimmer h-3 w-1/2 rounded-md" />
      <div className="skeleton-shimmer h-3 w-full rounded-md" />
      <div className="skeleton-shimmer h-3 w-3/4 rounded-md" />
      <div className="mt-2 skeleton-shimmer h-16 w-full rounded-lg" />
    </div>
  )
}
