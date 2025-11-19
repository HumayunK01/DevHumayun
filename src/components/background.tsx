import React from "react";


export function Background() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none w-full h-full">
      {/* Enhanced Background Effects - with improved responsive behavior */}
      {/* Use transform instead of changing position for better performance */}
      <div className="circle-bg bg-blue-300 dark:bg-blue-700 top-1/4 right-1/4 w-[50vw] h-[50vw] md:w-[35vw] md:h-[35vw] min-w-[200px] min-h-[200px] opacity-20 dark:opacity-15 blur-2xl md:blur-3xl will-change-transform" />
      <div className="circle-bg bg-purple-300 dark:bg-purple-700 bottom-1/4 left-1/4 w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] min-w-[250px] min-h-[250px] opacity-20 dark:opacity-15 blur-2xl md:blur-3xl will-change-transform" />
      <div className="circle-bg bg-teal-300 dark:bg-teal-700 top-1/3 left-1/3 w-[25vw] h-[25vw] min-w-[250px] min-h-[250px] opacity-20 dark:opacity-10 hidden md:block blur-3xl will-change-transform" />
    </div>
  );
}