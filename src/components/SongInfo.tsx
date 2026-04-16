import EqualizerBars from "./EqualizerBars";

interface SongInfoProps {
  stationName: string;
  isPlaying: boolean;
}

export default function SongInfo({ stationName, isPlaying }: SongInfoProps) {
  return (
    <div className="flex gap-[12px] items-center justify-center w-full max-w-[300px]">
      <EqualizerBars isPlaying={isPlaying} />
      <div className="flex flex-col items-start leading-normal min-w-0">
        <div className="flex items-center gap-[8px]">
          <div
            className="w-[6px] h-[6px] rounded-full flex-shrink-0 transition-all duration-500"
            style={{
              backgroundColor: isPlaying ? "#4ADE80" : "#666",
              boxShadow: isPlaying
                ? "0 0 6px rgba(74, 222, 128, 0.6)"
                : "none",
            }}
          />
          <p className="text-[18px] md:text-[20px] text-cream font-medium truncate">
            {stationName}
          </p>
        </div>
        <p className="text-[13px] md:text-[14px] text-cream/40 font-medium ml-[14px]">
          Solar radio
        </p>
      </div>
    </div>
  );
}
