interface PlayerControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

export default function PlayerControls({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
}: PlayerControlsProps) {
  return (
    <div className="flex flex-col gap-[24px] items-center w-full">
      {/* Time Label Container */}
      <div className="flex gap-[12px] items-center justify-center w-full">
        {/* Time Info */}
        <div className="flex flex-1 gap-[8px] items-center">
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
            {isPlaying ? "∞" : "Live"}
          </p>
        </div>
        {/* Mute Control */}
        <button
          onClick={onToggleMute}
          className="flex gap-[4px] items-center cursor-pointer transition-opacity hover:opacity-70"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/speaker-off-icon.svg"
            alt={isMuted ? "Unmute" : "Mute"}
            className={`w-[20px] h-[20px] flex-shrink-0 ${isMuted ? "opacity-50" : ""}`}
          />
        </button>
      </div>

      {/* Playback Controls */}
      <div className="flex flex-col gap-[16px] items-center w-[148px]">
        <div className="flex gap-[24px] items-center justify-center">
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
        </div>
      </div>
    </div>
  );
}
