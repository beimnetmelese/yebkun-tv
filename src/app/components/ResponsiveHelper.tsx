"use client";

import { useEffect, useState } from "react";

const ResponsiveHelper = () => {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
    breakpoint: "",
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      let breakpoint = "";

      if (width < 640) breakpoint = "xs";
      else if (width < 768) breakpoint = "sm";
      else if (width < 1024) breakpoint = "md";
      else if (width < 1280) breakpoint = "lg";
      else if (width < 1536) breakpoint = "xl";
      else breakpoint = "2xl";

      setViewport({ width, height, breakpoint });
    };

    // Initial update
    updateViewport();

    // Add resize listener
    window.addEventListener("resize", updateViewport);

    // Cleanup
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg z-50 text-sm flex flex-col">
      <span>
        {viewport.width} × {viewport.height}
      </span>
      <span className="font-bold">Breakpoint: {viewport.breakpoint}</span>
    </div>
  );
};

export default ResponsiveHelper;
