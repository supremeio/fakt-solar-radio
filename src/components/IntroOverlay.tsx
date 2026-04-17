"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "fakt-solar-radio:intro-seen";

export default function IntroOverlay() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setShow(true);
      }
    } catch {
      // localStorage unavailable — skip the overlay silently
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-[20px]"
          style={{
            backgroundColor: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.92, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full max-w-[420px] rounded-[18px] p-[6px]"
            style={{
              background:
                "linear-gradient(180deg, #C09A6E 0%, #A07848 30%, #8B5E3C 60%, #6B4520 100%)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full rounded-[14px] overflow-hidden"
              style={{
                background: `
                  repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.018) 3px, rgba(0,0,0,0.018) 6px),
                  linear-gradient(180deg, #A67C52 0%, #8B5E3C 55%, #7A4F30 100%)
                `,
              }}
            >
              <div className="px-[24px] py-[28px] md:px-[32px] md:py-[36px] flex flex-col items-center text-center gap-[14px] md:gap-[16px]">
                <p className="text-[10px] md:text-[11px] text-cream/55 uppercase tracking-[0.3em] font-medium">
                  FAKT Solar Radio
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] font-bold text-[26px] md:text-[32px] text-cream leading-[1.15]">
                  Music shaped by the sun
                </h2>
                <p className="text-[14px] md:text-[15px] text-cream/75 leading-relaxed">
                  Solar Radio streams live internet stations where the genre
                  changes with real-time solar irradiance at your chosen city.
                  Quiet sun plays ambient; a blazing sun plays electronic.
                </p>
                <button
                  onClick={dismiss}
                  className="mt-[6px] px-[22px] py-[10px] md:px-[26px] md:py-[12px] rounded-[8px] text-[12px] md:text-[13px] font-medium uppercase tracking-[0.15em] cursor-pointer active:scale-95 transition-transform"
                  style={{
                    background:
                      "radial-gradient(circle at 38% 35%, #F0F0F0 0%, #D8D8D8 30%, #B0B0B0 70%, #C0C0C0 100%)",
                    color: "#5D3A1A",
                    boxShadow:
                      "0 4px 10px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.4)",
                  }}
                >
                  Start listening
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
