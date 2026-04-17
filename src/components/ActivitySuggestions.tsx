import { SOLAR_ACTIVITIES } from "@/lib/constants";

interface ActivitySuggestionsProps {
  irradiance: number;
  description: string;
  genre: string;
}

export default function ActivitySuggestions({
  irradiance,
  description,
  genre,
}: ActivitySuggestionsProps) {
  const activities =
    SOLAR_ACTIVITIES[genre] ?? SOLAR_ACTIVITIES.Ambient;

  return (
    <div
      className="w-full rounded-[14px] overflow-hidden md:flex md:flex-col md:min-h-0"
      style={{
        background: `
          repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.018) 3px, rgba(0,0,0,0.018) 6px),
          linear-gradient(180deg, #9E7248 0%, #8B5E3C 50%, #7A4F30 100%)
        `,
        boxShadow:
          "0 6px 20px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.15)",
      }}
    >
      <div className="px-[18px] pt-[16px] pb-[12px] md:px-[22px] md:pt-[20px] md:pb-[14px] md:flex md:flex-col md:flex-1 md:min-h-0">
        <p className="text-[10px] md:text-[11px] text-cream-dark/60 uppercase tracking-[0.2em] font-medium">
          Good time to
        </p>
        <p className="text-[13px] md:text-[14px] text-cream/75 mt-[4px] mb-[14px] md:mb-[16px] leading-snug">
          {description} at{" "}
          <span className="tabular-nums text-cream/90">
            {Math.round(irradiance)} W/m²
          </span>
          . A good window for:
        </p>
        <ul className="flex flex-col gap-[6px] md:flex-1 md:min-h-0 md:overflow-y-auto md:pr-[6px] retro-scroll">
          {activities.map((activity) => (
            <li
              key={activity}
              className="flex items-center gap-[12px] px-[12px] py-[8px] md:px-[14px] md:py-[10px] rounded-[8px]"
              style={{
                backgroundColor: "rgba(0,0,0,0.12)",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="flex-shrink-0"
                aria-hidden="true"
              >
                <circle cx="7" cy="7" r="2.2" fill="#D4A04A" />
                <path
                  d="M7 1 L7 2.5 M7 11.5 L7 13 M1 7 L2.5 7 M11.5 7 L13 7 M2.5 2.5 L3.6 3.6 M10.4 10.4 L11.5 11.5 M2.5 11.5 L3.6 10.4 M10.4 3.6 L11.5 2.5"
                  stroke="#D4A04A"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[12px] md:text-[13px] text-cream/80 leading-snug">
                {activity}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
