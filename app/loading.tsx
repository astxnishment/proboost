export default function Loading() {
  return (
    <main
      aria-label="Loading page"
      aria-busy="true"
      className="page-container min-h-[calc(100svh-var(--header-height))] py-10 sm:py-14"
    >
      <div className="skeleton h-6 w-28" />
      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <div className="skeleton h-14 w-full max-w-xl sm:h-20" />
          <div className="skeleton mt-5 h-5 w-full max-w-lg" />
          <div className="skeleton mt-3 h-5 w-4/5 max-w-md" />
          <div className="mt-7 flex gap-3">
            <div className="skeleton h-12 w-40" />
            <div className="skeleton h-12 w-32" />
          </div>
        </div>
        <div className="skeleton aspect-[16/10] w-full" />
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <div className="skeleton h-40" />
        <div className="skeleton h-40" />
        <div className="skeleton h-40" />
      </div>
      <span className="sr-only">Loading ProBoost</span>
    </main>
  );
}
