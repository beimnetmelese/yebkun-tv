"use client";

import TimeUp from "@/app/kids/movie/time_up";
import { useEffect, useRef, useState } from "react";

interface CircularTimerProps {
  totalMinutes: number;
  cMinutes: number;
}

const CircularTimer = ({ totalMinutes, cMinutes }: CircularTimerProps) => {
  const [currentMinutes, setCurrentMinutes] = useState(cMinutes);
  const [showTimeUp, setShowTimeUp] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const segments = 60;
  const radius = 50;
  const strokeWidth = 1;
  const size = (radius + strokeWidth) * 2;
  const center = size / 2;

  useEffect(() => {
    if (currentMinutes <= 0) {
      setShowTimeUp(true);
      return;
    }

    const interval = setInterval(() => {
      setCurrentMinutes((prev) => {
        if (prev <= 1) {
          setShowTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 3600); // Update every minute

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

  // Handler for when time is set in the TimeUp component
  const handleTimeSet = (minutes: number) => {
    setCurrentMinutes(minutes);
    setShowTimeUp(false);
  };

  const handleTimerClick = () => {
    // Play click sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((err) => console.error("Error playing sound:", err));
    }
    setShowTimeUp(true);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/click.mp3"
        preload="auto"
        className="hidden"
      />
      <div
        className="relative w-[clamp(80px,10vw,120px)] h-[clamp(80px,10vw,120px)] flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
        onClick={handleTimerClick}
      >
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
      <TimeUp open={showTimeUp} onTimeSet={handleTimeSet} />
    </>
  );
};

export default CircularTimer;
