"use client";

import { motion } from "framer-motion";

const BAR_HEIGHTS = [20, 30, 14, 24];

// Fixed keyframe multipliers per bar to avoid Math.random() hydration mismatches
const BAR_KEYFRAMES = [
  [1, 0.4, 0.7, 0.85, 1],
  [1, 0.55, 0.3, 0.9, 1],
  [1, 0.8, 0.45, 0.6, 1],
  [1, 0.35, 0.75, 0.5, 1],
];

interface EqualizerBarsProps {
  isPlaying: boolean;
}

export default function EqualizerBars({ isPlaying }: EqualizerBarsProps) {
  return (
    <div className="flex gap-[3px] items-end shrink-0 h-[30px]">
      {BAR_HEIGHTS.map((height, i) => (
        <motion.div
          key={i}
          className="w-[5px] rounded-[2px]"
          style={{ backgroundColor: "#D4A04A" }}
          animate={
            isPlaying
              ? {
                  height: BAR_KEYFRAMES[i].map((m) => height * m),
                }
              : { height: height * 0.25 }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.8 + i * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : { duration: 0.4, ease: "easeOut" }
          }
        />
      ))}
    </div>
  );
}
