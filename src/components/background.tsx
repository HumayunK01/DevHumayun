import React from "react";

export function Background() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none w-full h-full">
      {/* Enhanced Background Effects - with improved responsive behavior */}
      <div className="circle-bg bg-blue-300 dark:bg-blue-700 top-1/4 right-1/4 w-[35vw] h-[35vw] min-w-[300px] min-h-[300px] opacity-30 dark:opacity-20" />
      <div className="circle-bg bg-purple-300 dark:bg-purple-700 bottom-1/4 left-1/4 w-[45vw] h-[45vw] min-w-[350px] min-h-[350px] opacity-30 dark:opacity-20" />
      <div className="circle-bg bg-teal-300 dark:bg-teal-700 top-1/3 left-1/3 w-[25vw] h-[25vw] min-w-[250px] min-h-[250px] opacity-20 dark:opacity-10" />
    </div>
  );
}
