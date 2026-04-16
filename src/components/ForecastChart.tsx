"use client";

import { motion } from "framer-motion";

interface ForecastChartProps {
  hourlyData: number[];
}

const TIME_MARKERS = [0, 4, 8, 12, 16, 20, 24];

export default function ForecastChart({ hourlyData }: ForecastChartProps) {
  const maxVal = Math.max(...hourlyData, 1);
  const bars = hourlyData.slice(0, 25).map((val) => {
    if (val <= 0) return { height: 3, active: false };
    const normalized = (val / maxVal) * 48;
    const height = Math.max(3, Math.round(normalized));
    return { height, active: height > 3 };
  });

  while (bars.length < 25) {
    bars.push({ height: 3, active: false });
  }

  return (
    <div
      className="w-full rounded-[8px] md:rounded-[10px] overflow-hidden"
      style={{
        backgroundColor: "#1A1A1A",
        boxShadow:
          "inset 0 2px 6px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(255,255,255,0.02)",
      }}
    >
      <div className="px-[14px] md:px-[20px] py-[12px] md:py-[16px]">
        <p className="text-[10px] md:text-[11px] text-cream/35 text-center uppercase tracking-[0.15em] font-medium mb-[10px]">
          24 Hour Solar Forecast
        </p>

        <div className="flex flex-col gap-[4px]">
          <div className="flex gap-[2px] md:gap-[3px] items-end justify-center w-full h-[48px]">
            {bars.map((bar, i) => (
              <motion.div
                key={i}
                className="flex-1 max-w-[12px] rounded-t-[2px]"
                style={{
                  backgroundColor: bar.active
                    ? "rgba(212, 160, 74, 0.7)"
                    : "rgba(212, 160, 74, 0.2)",
                }}
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

          <div className="flex items-center justify-between w-full text-[10px] md:text-[11px] text-cream/30 font-medium tabular-nums">
            {TIME_MARKERS.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
