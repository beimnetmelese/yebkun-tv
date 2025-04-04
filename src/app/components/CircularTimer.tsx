"use client";

import { useEffect, useState } from "react";

interface CircularTimerProps {
  totalMinutes: number;
  currentMinutes: number;
}

const CircularTimer = ({ totalMinutes }: CircularTimerProps) => {
  const [currentMinutes, setCurrentMinutes] = useState(totalMinutes);
  const segments = 60;
  const radius = 50;
  const strokeWidth = 1;
  const size = (radius + strokeWidth) * 2;
  const center = size / 2;

  useEffect(() => {
    if (currentMinutes <= 0) return;

    const interval = setInterval(() => {
      setCurrentMinutes((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [currentMinutes]);

  // Calculate which segments should be colored
  const activeSegments = Math.floor((currentMinutes / totalMinutes) * segments);

  // Generate the segments
  const renderSegments = () => {
    const segmentArray = [];
    for (let i = 0; i < segments; i++) {
      const angle = (i * 360) / segments;
      const isActive = i < activeSegments;

      // Calculate segment position with fixed precision
      const radians = (angle - 90) * (Math.PI / 180);
      const x1 = Number((center + (radius - 8) * Math.cos(radians)).toFixed(2));
      const y1 = Number((center + (radius - 8) * Math.sin(radians)).toFixed(2));
      const x2 = Number((center + radius * Math.cos(radians)).toFixed(2));
      const y2 = Number((center + radius * Math.sin(radians)).toFixed(2));

      segmentArray.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={isActive ? "#22C55E" : "#E2E8F0"}
          strokeWidth={3}
          strokeLinecap="round"
        />
      );
    }
    return segmentArray;
  };

  return (
    <div className="relative w-[clamp(80px,10vw,120px)] h-[clamp(80px,10vw,120px)] flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90 w-full h-full"
        viewBox={`0 0 ${size} ${size}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Outer circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={strokeWidth}
        />
        {/* Render all segments */}
        {renderSegments()}
        {/* Minutes display */}
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="middle"
          className="tv-text-large font-[400] text-[#000000] p-[10px] leading-[10px] font-[genos]"
          transform={`rotate(90 ${center} ${center})`}
        >
          {currentMinutes}
          <tspan
            x={center}
            y={center + 20}
            className="tv-text-medium font-[400] text-[#000000] leading-[10px] font-[genos] pt-[10px]"
          >
            min
          </tspan>
        </text>
      </svg>
    </div>
  );
};

export default CircularTimer;
