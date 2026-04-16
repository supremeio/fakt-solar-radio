import EqualizerBars from "./EqualizerBars";

interface SongInfoProps {
  stationName: string;
  isPlaying: boolean;
  searching: boolean;
}

export default function SongInfo({
  stationName,
  isPlaying,
  searching,
}: SongInfoProps) {
  return (
    <div className="flex gap-[12px] items-center justify-center w-full max-w-[300px]">
      <EqualizerBars isPlaying={isPlaying && !searching} />
      <div className="flex flex-col items-start leading-normal min-w-0">
        <div className="flex items-center gap-[8px] max-w-full">
          <div
            className="w-[6px] h-[6px] rounded-full flex-shrink-0 transition-all duration-500"
            style={{
              backgroundColor: searching
                ? "#D4A04A"
                : isPlaying
                  ? "#4ADE80"
                  : "#666",
              boxShadow: searching
                ? "0 0 6px rgba(212, 160, 74, 0.6)"
                : isPlaying
                  ? "0 0 6px rgba(74, 222, 128, 0.6)"
                  : "none",
              animation: searching ? "pulse 1.2s ease-in-out infinite" : "none",
            }}
          />
          <p className="text-[18px] md:text-[20px] text-cream font-medium truncate max-w-[220px] md:max-w-[260px]">
            {searching ? "Tuning..." : stationName}
          </p>
        </div>
        <p className="text-[13px] md:text-[14px] text-cream/40 font-medium ml-[14px]">
          {searching ? "Finding a station" : "Solar radio"}
        </p>
      </div>
    </div>
  );
}
