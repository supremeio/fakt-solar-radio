"use client";

import { useState } from "react";
import {
  CUSTOM_PRESET_ID,
  DEFAULT_CUSTOM_BUCKETS,
  MUSIC_OPTIONS,
  SOLAR_BUCKETS,
} from "@/lib/constants";
import type { TasteBucketTuple } from "@/lib/constants";

interface TasteEditorProps {
  presetId: string;
  customBuckets: TasteBucketTuple;
  avoidedTags: string[];
  onPresetChange: (presetId: string) => void;
  onCustomBucketsChange: (buckets: TasteBucketTuple) => void;
  onAvoidedTagsChange: (tags: string[]) => void;
}

function selectStyle(isActive: boolean) {
  return {
    backgroundColor: isActive ? "rgba(232, 192, 106, 0.2)" : "rgba(0,0,0,0.14)",
    boxShadow: isActive
      ? "inset 0 0 0 1px rgba(232, 192, 106, 0.42)"
      : "inset 0 0 0 1px rgba(0,0,0,0.08)",
  };
}

export default function TasteEditor({
  presetId,
  customBuckets,
  avoidedTags,
  onPresetChange,
  onCustomBucketsChange,
  onAvoidedTagsChange,
}: TasteEditorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const setBucket = (bucketIndex: number, tag: string) => {
    const option = MUSIC_OPTIONS.find((item) => item.tag === tag);
    if (!option) return;

    const nextBuckets = [...customBuckets] as TasteBucketTuple;
    nextBuckets[bucketIndex] = option;
    onCustomBucketsChange(nextBuckets);
    onPresetChange(CUSTOM_PRESET_ID);
  };

  const toggleAvoided = (tag: string) => {
    const nextTags = avoidedTags.includes(tag)
      ? avoidedTags.filter((item) => item !== tag)
      : [...avoidedTags, tag];
    onAvoidedTagsChange(nextTags);
  };

  const resetTaste = () => {
    onCustomBucketsChange(DEFAULT_CUSTOM_BUCKETS);
    onAvoidedTagsChange([]);
    onPresetChange("auto");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="h-[28px] md:h-[32px] px-[12px] md:px-[14px] rounded-[4px] text-[10px] md:text-[11px] text-wood-dark uppercase tracking-[0.14em] font-bold cursor-pointer active:scale-95 transition-transform"
        style={{
          backgroundColor: "#F0ECE4",
          boxShadow:
            "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.1)",
        }}
      >
        Tune taste
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-[16px]"
          style={{
            backgroundColor: "rgba(0,0,0,0.48)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-[620px] rounded-[18px] p-[6px]"
            style={{
              background:
                "linear-gradient(180deg, #C09A6E 0%, #A07848 30%, #8B5E3C 60%, #6B4520 100%)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.48)",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="rounded-[14px] overflow-hidden"
              style={{
                background: `
                  repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.018) 3px, rgba(0,0,0,0.018) 6px),
                  linear-gradient(180deg, #A67C52 0%, #8B5E3C 58%, #7A4F30 100%)
                `,
              }}
            >
              <div className="px-[18px] py-[18px] md:px-[24px] md:py-[22px]">
                <div className="flex items-start justify-between gap-[16px] mb-[14px]">
                  <div>
                    <p className="text-[10px] md:text-[11px] text-cream/55 uppercase tracking-[0.24em] font-medium">
                      Taste tuner
                    </p>
                    <h2 className="font-[family-name:var(--font-playfair)] font-bold text-[26px] md:text-[32px] text-cream leading-tight mt-[3px]">
                      Shape the solar mix
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close taste tuner"
                    className="w-[30px] h-[30px] rounded-[4px] text-[18px] leading-none text-wood-dark cursor-pointer"
                    style={{
                      backgroundColor: "#F0ECE4",
                      boxShadow:
                        "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.8)",
                    }}
                  >
                    x
                  </button>
                </div>

                <p className="text-[13px] md:text-[14px] text-cream/72 leading-snug mb-[16px]">
                  Pick the sound for each sun range. Avoided styles are skipped
                  even when a preset would normally choose them.
                </p>

                <div className="grid gap-[8px] mb-[18px]">
                  {SOLAR_BUCKETS.map((bucket, index) => (
                    <div
                      key={bucket.name}
                      className="grid grid-cols-[72px_1fr] md:grid-cols-[88px_1fr] gap-[10px] items-center px-[12px] py-[10px] rounded-[8px]"
                      style={{ backgroundColor: "rgba(0,0,0,0.12)" }}
                    >
                      <span className="text-[11px] md:text-[12px] text-cream/65 uppercase tracking-[0.12em] font-medium">
                        {bucket.name}
                      </span>
                      <select
                        value={customBuckets[index].tag}
                        onChange={(event) => setBucket(index, event.target.value)}
                        className="w-full h-[34px] rounded-[4px] px-[10px] text-[13px] md:text-[14px] text-cream bg-[#6F482A] outline-none"
                      >
                        {MUSIC_OPTIONS.map((option) => (
                          <option key={option.tag} value={option.tag}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                <div className="mb-[18px]">
                  <p className="text-[10px] md:text-[11px] text-cream-dark/60 uppercase tracking-[0.2em] font-medium mb-[8px]">
                    Avoid
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-[6px]">
                    {MUSIC_OPTIONS.map((option) => {
                      const isAvoided = avoidedTags.includes(option.tag);
                      return (
                        <button
                          key={option.tag}
                          onClick={() => toggleAvoided(option.tag)}
                          className={`h-[34px] rounded-[6px] px-[8px] text-[12px] md:text-[13px] font-medium cursor-pointer transition-colors ${
                            isAvoided ? "text-amber-light" : "text-cream/68"
                          }`}
                          style={selectStyle(isAvoided)}
                        >
                          {option.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-[10px]">
                  <button
                    onClick={resetTaste}
                    className="h-[34px] px-[12px] rounded-[6px] text-[11px] md:text-[12px] text-cream/70 uppercase tracking-[0.12em] cursor-pointer"
                    style={{ backgroundColor: "rgba(0,0,0,0.16)" }}
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      if (presetId !== CUSTOM_PRESET_ID) {
                        onPresetChange(CUSTOM_PRESET_ID);
                      }
                      setIsOpen(false);
                    }}
                    className="h-[36px] px-[18px] rounded-[7px] text-[11px] md:text-[12px] text-wood-dark uppercase tracking-[0.14em] font-bold cursor-pointer active:scale-95 transition-transform"
                    style={{
                      background:
                        "radial-gradient(circle at 38% 35%, #F0F0F0 0%, #D8D8D8 30%, #B0B0B0 70%, #C0C0C0 100%)",
                      boxShadow:
                        "0 4px 10px rgba(0,0,0,0.28), inset 0 1px 2px rgba(255,255,255,0.4)",
                    }}
                  >
                    Use my mix
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
