"use client";

import { motion } from "framer-motion";

interface SolarGaugeProps {
  value: number;
}

const SCALE_MARKS = [0, 200, 400, 600, 800, 1000];
const MINOR_TICKS = [100, 300, 500, 700, 900];
const MAX_VALUE = 1000;

export default function SolarGauge({ value }: SolarGaugeProps) {
  const clampedValue = Math.min(Math.max(value, 0), MAX_VALUE);
  const percentage = (clampedValue / MAX_VALUE) * 100;

  return (
    <div
      className="w-full rounded-[8px] md:rounded-[10px] overflow-hidden relative"
      style={{
        backgroundColor: "#1A1A1A",
        boxShadow:
          "inset 0 2px 8px rgba(0,0,0,0.5), inset 0 -1px 2px rgba(255,255,255,0.03)",
      }}
    >
      {/* Glass reflection */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none rounded-[inherit]" />

      <div className="relative px-[16px] md:px-[24px] py-[14px] md:py-[18px]">
        {/* Top labels */}
        <div className="flex justify-between items-center mb-[10px] md:mb-[14px]">
          <span className="text-[10px] md:text-[11px] text-cream/40 uppercase tracking-[0.15em] font-medium">
            Solar
          </span>
          <span className="text-[10px] md:text-[11px] text-cream/40 uppercase tracking-[0.15em] font-medium">
            W/m²
          </span>
        </div>

        {/* Scale numbers */}
        <div className="flex justify-between items-end mb-[6px]">
          {SCALE_MARKS.map((mark) => (
            <span
              key={mark}
              className="text-[11px] md:text-[13px] text-cream/60 tabular-nums font-medium"
            >
              {mark}
            </span>
          ))}
        </div>

        {/* Scale line + tick marks + needle */}
        <div className="relative h-[28px]">
          {/* Horizontal scale line */}
          <div className="absolute top-[12px] left-0 right-0 h-px bg-cream/20" />

          {/* Major tick marks */}
          <div className="absolute inset-x-0 top-0 flex justify-between">
            {SCALE_MARKS.map((mark) => (
              <div key={mark} className="w-px h-[16px] bg-cream/30" />
            ))}
          </div>

          {/* Minor tick marks */}
          {MINOR_TICKS.map((mark) => (
            <div
              key={mark}
              className="absolute top-[4px] w-px h-[10px] bg-cream/15"
              style={{ left: `${(mark / MAX_VALUE) * 100}%` }}
            />
          ))}

          {/* Orange needle */}
          <motion.div
            className="absolute top-0 w-[2px] h-[28px] rounded-full"
            style={{
              backgroundColor: "#E85D26",
              boxShadow: "0 0 6px rgba(232, 93, 38, 0.5)",
              marginLeft: "-1px",
            }}
            animate={{ left: `${percentage}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>

        {/* Genre zone indicators */}
        <div className="flex mt-[8px] h-[3px] rounded-full overflow-hidden gap-px">
          <div
            className="bg-blue-400/15 rounded-l-full"
            style={{ width: "10%" }}
          />
          <div className="bg-violet-400/15" style={{ width: "20%" }} />
          <div className="bg-amber-400/15" style={{ width: "30%" }} />
          <div
            className="bg-red-400/15 rounded-r-full"
            style={{ width: "40%" }}
          />
        </div>

        {/* Current value display */}
        <div className="flex items-baseline justify-center mt-[10px] gap-[4px]">
          <span className="font-bold text-[24px] md:text-[28px] text-cream tabular-nums">
            {Math.round(clampedValue)}
          </span>
        </div>
      </div>
    </div>
  );
}
