interface PlayerControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PlayerControls({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
  onNext,
  onPrev,
}: PlayerControlsProps) {
  return (
    <div className="flex flex-col gap-[24px] items-center w-full">
      {/* Progress bar */}
      <div className="flex gap-[8px] items-center w-full">
        <p className="font-medium text-[16px] leading-normal text-white text-center whitespace-nowrap">
          {isPlaying ? "LIVE" : "0:00"}
        </p>
        <div className="relative flex-1 h-[8px]">
          <div className="absolute inset-0 bg-white/20 rounded-[40px]" />
          <div
            className={`absolute top-0 left-0 h-[8px] bg-white rounded-[40px] transition-all duration-500 ${
              isPlaying ? "w-full" : "w-1/3"
            }`}
          />
        </div>
        <p className="font-medium text-[16px] leading-normal text-white text-center whitespace-nowrap">
          {isPlaying ? "∞" : "2:23"}
        </p>
      </div>

      {/* Playback controls */}
      <div className="flex flex-col gap-[16px] items-center w-[148px]">
        {/* Transport buttons */}
        <div className="flex gap-[24px] items-center w-full">
          {/* Previous */}
          <button
            onClick={onPrev}
            className="w-[24px] h-[24px] flex-shrink-0 cursor-pointer transition-opacity hover:opacity-70"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/previous-icon.svg" alt="Previous" className="w-full h-full" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={onTogglePlay}
            className="w-[52px] h-[52px] flex-shrink-0 cursor-pointer transition-opacity hover:opacity-80"
          >
            {isPlaying ? (
              <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="26" cy="26" r="26" fill="white" fillOpacity="0.1" />
                <rect x="18" y="15" width="5" height="22" rx="1.5" fill="white" />
                <rect x="29" y="15" width="5" height="22" rx="1.5" fill="white" />
              </svg>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/images/play-button.svg" alt="Play" className="w-full h-full" />
            )}
          </button>

          {/* Next */}
          <button
            onClick={onNext}
            className="w-[24px] h-[24px] flex-shrink-0 cursor-pointer transition-opacity hover:opacity-70"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/next-icon.svg" alt="Next" className="w-full h-full" />
          </button>
        </div>

        {/* Mute control */}
        <button
          onClick={onToggleMute}
          className="flex gap-[4px] items-center cursor-pointer transition-opacity hover:opacity-70"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/speaker-off-icon.svg"
            alt="Mute"
            className={`w-[20px] h-[20px] flex-shrink-0 ${isMuted ? "opacity-50" : ""}`}
          />
          <p className="font-medium text-[16px] leading-normal text-white text-center whitespace-nowrap">
            {isMuted ? "Unmute" : "Mute"}
          </p>
        </button>
      </div>
    </div>
  );
}
