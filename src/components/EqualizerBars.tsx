"use client";

import { motion } from "framer-motion";

const BAR_HEIGHTS = [24.96, 37.44, 15.6, 21.84];

interface EqualizerBarsProps {
  isPlaying: boolean;
}

export default function EqualizerBars({ isPlaying }: EqualizerBarsProps) {
  return (
    <div className="flex gap-[4.68px] items-start shrink-0">
      {BAR_HEIGHTS.map((height, i) => (
        <motion.div
          key={i}
          className="bg-white w-[6.24px] rounded-[62.4px]"
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
              : { height: height * 0.3 }
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
