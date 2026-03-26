"use client";

import { motion } from "framer-motion";

interface ForecastChartProps {
  hourlyData: number[];
}

const TIME_MARKERS = [0, 4, 8, 12, 16, 20, 24];

export default function ForecastChart({ hourlyData }: ForecastChartProps) {
  const maxVal = Math.max(...hourlyData, 1);
  const bars = hourlyData.slice(0, 25).map((val) => {
    if (val <= 0) return { height: 4, active: false };
    const normalized = (val / maxVal) * 57;
    const height = Math.max(4, Math.round(normalized));
    return { height, active: height > 4 };
  });

  while (bars.length < 25) {
    bars.push({ height: 4, active: false });
  }

  return (
    <div className="flex flex-col gap-[16px] items-center w-full">
      <p className="font-medium text-[14px] md:text-[16px] leading-normal text-white/50 text-center uppercase w-full">
        24 hours solar forcast
      </p>
      <div className="flex flex-col gap-[4px] items-start w-full">
        {/* Bars */}
        <div className="flex gap-[2px] md:gap-[4px] items-end justify-center w-full">
          {bars.map((bar, i) => (
            <motion.div
              key={i}
              className={`flex-1 max-w-[14px] rounded-tl-[4px] rounded-tr-[4px] ${
                bar.active ? "bg-white/40" : "bg-white/30"
              }`}
              initial={{ height: 0 }}
              animate={{ height: bar.height }}
              transition={{
                duration: 0.6,
                delay: i * 0.03,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
        {/* Time markers */}
        <div className="flex items-center justify-between w-full font-medium leading-normal text-[12px] md:text-[16px] text-white/50 text-center uppercase">
          {TIME_MARKERS.map((t) => (
            <p key={t}>
              {t}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
