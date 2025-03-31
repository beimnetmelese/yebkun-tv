"use client";

interface CircularTimerProps {
  totalMinutes: number;
  currentMinutes: number;
}

const CircularTimer = ({
  totalMinutes,
  currentMinutes,
}: CircularTimerProps) => {
  const segments = 60; // Number of segments in the circle
  const radius = 50;
  const strokeWidth = 4;
  const size = (radius + strokeWidth) * 2;
  const center = size / 2;

  // Calculate which segments should be colored
  const activeSegments = Math.floor((currentMinutes / totalMinutes) * segments);

  // Generate the segments
  const renderSegments = () => {
    const segmentArray = [];
    for (let i = 0; i < segments; i++) {
      const angle = (i * 360) / segments;
      const isActive = i < activeSegments;

      // Calculate segment position
      const radians = (angle - 90) * (Math.PI / 180);
      const x1 = center + (radius - 8) * Math.cos(radians);
      const y1 = center + (radius - 8) * Math.sin(radians);
      const x2 = center + radius * Math.cos(radians);
      const y2 = center + radius * Math.sin(radians);

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
    <div className="relative w-[120px] h-[120px] flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
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
          className="text-[50px] font-[400] text-[#000000] p-[10px] leading-[10px] font-[genos]"
          transform={`rotate(90 ${center} ${center})`}
          
        >
          {currentMinutes}
          <tspan x={center} y={center + 20} className="text-[30px]  font-[400] text-[#000000] leading-[10px] font-[genos] pt-[10px]">
            min
          </tspan>
        </text>
      </svg>
    </div>
  );
};

export default CircularTimer;
