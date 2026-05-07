import React from "react";

const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={`bg-slate-200 dark:bg-slate-700 animate-pulse rounded-xl ${className}`}
    ></div>
  );
};

export default Skeleton;
