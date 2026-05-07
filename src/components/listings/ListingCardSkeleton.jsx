import React from "react";
import Skeleton from "../common/Skeleton";

const ListingCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-[2rem] overflow-hidden p-6 shadow-sm">
      {/* Image area */}
      <Skeleton className="h-48 w-full rounded-2xl mb-6" />

      {/* Badges */}
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Title & Info */}
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-1/2 mb-4" />

      {/* Detail bar */}
      <Skeleton className="h-3 w-1/3 mb-6" />

      {/* Pricing row */}
      <div className="flex justify-between items-end border-t border-slate-50 dark:border-slate-700/50 pt-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="space-y-2 flex flex-col items-end">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>

      {/* Button */}
      <Skeleton className="h-12 w-full mt-6 rounded-xl" />
    </div>
  );
};

export default ListingCardSkeleton;
