import { GENRE_PRESETS, SOLAR_BUCKETS } from "@/lib/constants";

interface HowItWorksProps {
  city: string;
  presetId: string;
  presetName: string;
  bucketIndex: number;
}

export default function HowItWorks({
  city,
  presetId,
  presetName,
  bucketIndex,
}: HowItWorksProps) {
  const cityShort = city.split(",")[0];
  const preset =
    GENRE_PRESETS.find((p) => p.id === presetId) ?? GENRE_PRESETS[0];
  const isAuto = preset.id === "auto";

  return (
    <div
      className="w-full rounded-[14px] overflow-hidden"
      style={{
        background: `
          repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.018) 3px, rgba(0,0,0,0.018) 6px),
          linear-gradient(180deg, #9E7248 0%, #8B5E3C 50%, #7A4F30 100%)
        `,
        boxShadow:
          "0 6px 20px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.15)",
      }}
    >
      <div className="px-[18px] py-[16px] md:px-[22px] md:py-[20px]">
        <p className="text-[10px] md:text-[11px] text-cream-dark/60 uppercase tracking-[0.2em] font-medium">
          How it works
        </p>
        <p className="text-[13px] md:text-[14px] text-cream/75 mt-[4px] mb-[14px] md:mb-[16px] leading-snug">
          {isAuto ? (
            <>
              The sun&apos;s intensity in {cityShort} picks a genre. Four moods,
              live.
            </>
          ) : (
            <>
              You picked{" "}
              <span className="text-cream font-medium">{presetName}</span>. The
              sun in {cityShort} shapes its mood — calmer at dawn, brighter at
              noon.
            </>
          )}
        </p>
        <div className="flex flex-col gap-[6px]">
          {SOLAR_BUCKETS.map((b, i) => {
            const prevMax = i === 0 ? 0 : SOLAR_BUCKETS[i - 1].max;
            const isActive = i === bucketIndex;
            const rangeLabel =
              b.max === Infinity
                ? `${prevMax}+ W/m²`
                : `${prevMax}–${b.max} W/m²`;
            const subgenreName = preset.buckets[i].name;
            return (
              <div
                key={b.name}
                className="flex items-center justify-between gap-[10px] px-[12px] py-[8px] md:px-[14px] md:py-[10px] rounded-[8px] transition-all duration-300"
                style={{
                  backgroundColor: isActive
                    ? "rgba(232, 192, 106, 0.18)"
                    : "rgba(0,0,0,0.12)",
                  boxShadow: isActive
                    ? "inset 0 0 0 1px rgba(232, 192, 106, 0.4)"
                    : "inset 0 0 0 1px rgba(0,0,0,0.05)",
                }}
              >
                <span
                  className={`text-[11px] md:text-[12px] uppercase tracking-[0.12em] font-medium min-w-[64px] ${
                    isActive ? "text-cream" : "text-cream/50"
                  }`}
                >
                  {b.name}
                </span>
                <span
                  className={`text-[10px] md:text-[11px] tabular-nums flex-1 text-center ${
                    isActive ? "text-cream/80" : "text-cream/35"
                  }`}
                >
                  {rangeLabel}
                </span>
                <span
                  className={`text-[13px] md:text-[14px] font-medium min-w-[88px] text-right ${
                    isActive ? "text-amber-light" : "text-cream/50"
                  }`}
                >
                  {subgenreName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
