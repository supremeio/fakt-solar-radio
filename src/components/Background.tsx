"use client";

interface BackgroundProps {
  irradiance: number;
}

export default function Background({ irradiance }: BackgroundProps) {
  const clampedIrradiance = Math.min(Math.max(irradiance, 0), 1000);
  const warmth = 0.08 + (clampedIrradiance / 1000) * 0.2;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-linen">
      <div
        className="absolute inset-0 transition-opacity duration-[2000ms]"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, rgba(212, 160, 74, ${warmth}) 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)
          `,
        }}
      />
    </div>
  );
}
