"use client";

import { type ReactNode, useRef, useCallback } from "react";

interface PlayerControlsProps {
  isPlaying: boolean;
  volume: number;
  onTogglePlay: () => void;
  onVolumeChange: (volume: number) => void;
  children?: ReactNode;
}

const KNOB_STYLE = {
  background:
    "radial-gradient(circle at 38% 35%, #F0F0F0 0%, #D8D8D8 20%, #B0B0B0 45%, #888 60%, #A0A0A0 80%, #C0C0C0 100%)",
  boxShadow:
    "0 4px 10px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.4)",
};

const DIMPLE_STYLE = {
  background:
    "radial-gradient(circle at 40% 35%, #D0D0D0, #A0A0A0 60%, #909090)",
};

const MIN_ANGLE = -135;
const MAX_ANGLE = 135;

function PowerKnob({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-[6px]">
      <button
        onClick={onClick}
        className="relative w-[52px] h-[52px] md:w-[60px] md:h-[60px] rounded-full cursor-pointer active:scale-95 transition-transform"
        style={KNOB_STYLE}
      >
        <div className="absolute inset-[22%] rounded-full" style={DIMPLE_STYLE} />
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={{ transform: `rotate(${isActive ? 120 : -120}deg)` }}
        >
          <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[2px] h-[10px] md:h-[12px] bg-[#444] rounded-full" />
        </div>
      </button>
      <span className="text-[9px] md:text-[10px] text-cream/40 uppercase tracking-[0.15em] font-medium">
        Power
      </span>
    </div>
  );
}

function VolumeKnob({
  volume,
  onVolumeChange,
}: {
  volume: number;
  onVolumeChange: (v: number) => void;
}) {
  const knobRef = useRef<HTMLDivElement>(null);
  const angle = MIN_ANGLE + volume * (MAX_ANGLE - MIN_ANGLE);

  const angleToVolume = useCallback((clientX: number, clientY: number) => {
    const knob = knobRef.current;
    if (!knob) return;

    const rect = knob.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const raw = Math.atan2(clientX - cx, -(clientY - cy)) * (180 / Math.PI);
    const clamped = Math.max(MIN_ANGLE, Math.min(MAX_ANGLE, raw));
    onVolumeChange((clamped - MIN_ANGLE) / (MAX_ANGLE - MIN_ANGLE));
  }, [onVolumeChange]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      angleToVolume(e.clientX, e.clientY);

      const onMove = (ev: MouseEvent) => angleToVolume(ev.clientX, ev.clientY);
      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [angleToVolume]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const t = e.touches[0];
      angleToVolume(t.clientX, t.clientY);

      const onMove = (ev: TouchEvent) => {
        const t = ev.touches[0];
        angleToVolume(t.clientX, t.clientY);
      };
      const onEnd = () => {
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onEnd);
      };
      document.addEventListener("touchmove", onMove);
      document.addEventListener("touchend", onEnd);
    },
    [angleToVolume]
  );

  return (
    <div className="flex flex-col items-center gap-[6px]">
      <div
        ref={knobRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="relative w-[52px] h-[52px] md:w-[60px] md:h-[60px] rounded-full cursor-grab active:cursor-grabbing select-none"
        style={KNOB_STYLE}
      >
        <div className="absolute inset-[22%] rounded-full" style={DIMPLE_STYLE} />
        <div
          className="absolute inset-0 transition-transform duration-100 ease-out"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[2px] h-[10px] md:h-[12px] bg-[#444] rounded-full" />
        </div>
      </div>
      <span className="text-[9px] md:text-[10px] text-cream/40 uppercase tracking-[0.15em] font-medium">
        Volume
      </span>
    </div>
  );
}

export default function PlayerControls({
  isPlaying,
  volume,
  onTogglePlay,
  onVolumeChange,
  children,
}: PlayerControlsProps) {
  return (
    <div className="flex items-center justify-between w-full pt-[20px] md:pt-[24px] pb-[4px]">
      <PowerKnob isActive={isPlaying} onClick={onTogglePlay} />
      <div className="flex-1 flex justify-center px-[8px]">{children}</div>
      <VolumeKnob volume={volume} onVolumeChange={onVolumeChange} />
    </div>
  );
}
