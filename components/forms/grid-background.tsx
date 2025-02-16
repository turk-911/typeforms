import React from "react";

export function GridBackground() {
  return (
    <div className="h-full w-full bg-black dark:bg-black bg-grid-white/[0.1] dark:bg-grid-gray-800/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
    </div>
  );
}
