import EqualizerBars from "./EqualizerBars";

interface SongInfoProps {
  stationName: string;
  isPlaying: boolean;
}

export default function SongInfo({ stationName, isPlaying }: SongInfoProps) {
  return (
    <div className="flex gap-[16px] items-center justify-center w-full">
      <EqualizerBars isPlaying={isPlaying} />
      <div className="flex flex-col font-medium items-start leading-normal">
        <p className="text-[24px] text-white truncate">
          {stationName}
        </p>
        <p className="text-[16px] text-white/50">
          Solar radio
        </p>
      </div>
    </div>
  );
}
