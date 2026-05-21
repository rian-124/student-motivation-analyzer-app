export const DashboardSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-32 bg-white rounded-2xl border border-slate-100 shadow-sm"
        />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 h-96 bg-white rounded-2xl border border-slate-100 shadow-sm" />
      <div className="h-96 bg-white rounded-2xl border border-slate-100 shadow-sm" />
    </div>
  </div>
);

export const TableSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    {/* Page Header Skeleton */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="space-y-3">
        <div className="h-9 w-64 bg-slate-200 rounded-xl" />
        <div className="h-4 w-96 bg-slate-100 rounded-lg" />
      </div>
      <div className="flex items-center gap-3">
        <div className="h-10 w-24 bg-white rounded-xl border border-slate-100 shadow-sm" />
        <div className="h-10 w-32 bg-brand/20 rounded-xl" />
      </div>
    </div>

    {/* Table Content Skeleton */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-50 flex justify-between bg-slate-50/30">
        <div className="h-8 w-48 bg-slate-100 rounded-lg" />
        <div className="h-8 w-64 bg-slate-100 rounded-lg" />
      </div>
      <div className="p-0">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-16 border-b border-slate-50 flex items-center px-6 gap-6"
          >
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/4 bg-slate-100 rounded" />
              <div className="h-2 w-1/6 bg-slate-50 rounded" />
            </div>
            <div className="h-4 w-12 bg-slate-50 rounded" />
            <div className="h-5 w-20 bg-slate-50 rounded-full" />
            <div className="h-3 w-16 bg-slate-50 rounded" />
            <div className="h-8 w-20 bg-slate-50 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const UploadSkeleton = () => (
  <div className="max-w-5xl mx-auto space-y-10 animate-pulse">
    {/* Header Skeleton */}
    <div className="space-y-3">
      <div className="h-9 w-64 bg-slate-200 rounded-xl" />
      <div className="h-4 w-[500px] bg-slate-100 rounded-lg" />
    </div>

    {/* Dropzone Skeleton */}
    <div className="h-[450px] bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center space-y-6">
      <div className="w-24 h-24 bg-slate-50 rounded-[2rem]" />
      <div className="space-y-3 flex flex-col items-center">
        <div className="h-5 w-48 bg-slate-50 rounded" />
        <div className="h-3 w-32 bg-slate-50 rounded" />
      </div>
      <div className="h-12 w-40 bg-slate-100 rounded-xl" />
    </div>

    {/* Guide Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-32 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-3"
        >
          <div className="h-8 w-8 bg-slate-50 rounded-lg" />
          <div className="h-3 w-full bg-slate-50 rounded" />
        </div>
      ))}
    </div>
  </div>
);

export const SidebarSkeleton = () => (
  <div className="p-4 space-y-6">
    <div className="space-y-3">
      <div className="h-2 w-20 bg-slate-100 rounded animate-pulse" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-10 w-full bg-slate-50 rounded-xl animate-pulse"
          />
        ))}
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-2 w-24 bg-slate-100 rounded animate-pulse" />
      <div className="space-y-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-10 w-full bg-slate-50 rounded-xl animate-pulse"
          />
        ))}
      </div>
    </div>
  </div>
);
