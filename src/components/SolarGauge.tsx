"use client";

import { motion } from "framer-motion";

interface SolarGaugeProps {
  value: number;
}

export default function SolarGauge({ value }: SolarGaugeProps) {
  // The gauge is 120x120px with arcs
  // The background arc (Ellipse 7) is a near-full circle at 20% opacity
  // The progress arc (Ellipse 6) shows the current value portion
  const radius = 52;
  const strokeWidth = 8;
  const center = 60;
  const circumference = 2 * Math.PI * radius;

  // The gauge arc starts from top-right and goes clockwise ~270 degrees
  // Based on the Figma SVG, the background arc covers about 75% of the circle
  const arcLength = circumference * 0.75;
  const gapLength = circumference - arcLength;

  // Progress maps value (0-1000 W/m²) to arc fill
  const maxValue = 1000;
  const clampedValue = Math.min(value, maxValue);
  const progressRatio = clampedValue / maxValue;
  const progressLength = arcLength * progressRatio;
  const progressGap = circumference - progressLength;

  return (
    <div className="relative inline-flex items-center justify-center w-[120px] h-[120px]">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="transform rotate-[135deg]"
      >
        {/* Background arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${gapLength}`}
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#D9D9D9"
          strokeWidth={strokeWidth}
          strokeDasharray={`${progressLength} ${progressGap}`}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${progressLength} ${progressGap}` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center uppercase">
        <p className="font-bold text-[24px] leading-normal text-white">
          {Math.round(clampedValue)}
        </p>
        <p className="font-medium text-[16px] leading-none text-white/40">
          <span>W/M</span>
          <span className="text-[10.32px]">2</span>
        </p>
      </div>
    </div>
  );
}
