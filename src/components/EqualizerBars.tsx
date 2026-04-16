"use client";

import { motion } from "framer-motion";

const BAR_HEIGHTS = [20, 30, 14, 24];

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
                  height: [
                    height,
                    height * 0.3 + Math.random() * height * 0.9,
                    height * 0.6,
                    height * 0.2 + Math.random() * height,
                    height,
                  ],
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
