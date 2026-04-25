"use client";

import { GENRE_PRESETS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

interface GenreBadgeProps {
  presetId: string;
  onPresetChange: (presetId: string) => void;
}

export default function GenreBadge({
  presetId,
  onPresetChange,
}: GenreBadgeProps) {
  const currentIndex = GENRE_PRESETS.findIndex((p) => p.id === presetId);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const current = GENRE_PRESETS[safeIndex];

  const handlePrev = () => {
    const newIndex =
      (safeIndex - 1 + GENRE_PRESETS.length) % GENRE_PRESETS.length;
    onPresetChange(GENRE_PRESETS[newIndex].id);
  };

  const handleNext = () => {
    const newIndex = (safeIndex + 1) % GENRE_PRESETS.length;
    onPresetChange(GENRE_PRESETS[newIndex].id);
  };

  return (
    <div className="flex items-center gap-[8px] md:gap-[12px]">
      <button
        onClick={handlePrev}
        aria-label="Previous genre"
        className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-[4px] flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
        style={{
          backgroundColor: "#F0ECE4",
          boxShadow:
            "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.1)",
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M6.5 2L3.5 5L6.5 8"
            stroke="#5D3A1A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className="min-w-[120px] md:min-w-[140px] h-[28px] md:h-[32px] rounded-[4px] flex items-center justify-center px-[10px] overflow-hidden"
        style={{
          backgroundColor: "rgba(0,0,0,0.15)",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={current.id}
            className="text-[11px] md:text-[12px] text-cream/70 font-medium whitespace-nowrap"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {current.name}
          </motion.span>
        </AnimatePresence>
      </div>

      <button
        onClick={handleNext}
        aria-label="Next genre"
        className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-[4px] flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
        style={{
          backgroundColor: "#F0ECE4",
          boxShadow:
            "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.1)",
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M3.5 2L6.5 5L3.5 8"
            stroke="#5D3A1A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
