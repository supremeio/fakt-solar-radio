"use client";

import { motion } from "framer-motion";

const BLOBS = [
  {
    color: "#00DD81",
    x: 60,
    y: 10,
    size: 600,
    drift: { x: [0, 80, -60, 100, 0], y: [0, -70, 50, -40, 0] },
  },
  {
    color: "#0038FF",
    x: 15,
    y: 45,
    size: 700,
    drift: { x: [0, -70, 40, -90, 0], y: [0, 60, -40, 80, 0] },
  },
  {
    color: "#FF00F5",
    x: 25,
    y: 55,
    size: 650,
    drift: { x: [0, 90, -50, 60, 0], y: [0, -80, 70, -50, 0] },
  },
  {
    color: "#FF4545",
    x: 55,
    y: 55,
    size: 800,
    drift: { x: [0, -100, 60, -40, 0], y: [0, 50, -70, 60, 0] },
  },
  {
    color: "#FF50D4",
    x: 48,
    y: 50,
    size: 550,
    drift: { x: [0, 70, -80, 50, 0], y: [0, -60, 40, -70, 0] },
  },
  {
    color: "#FFF181",
    x: 75,
    y: 35,
    size: 400,
    drift: { x: [0, -60, 90, -50, 0], y: [0, 80, -50, 60, 0] },
  },
];

interface BackgroundProps {
  irradiance: number;
}

export default function Background({ irradiance }: BackgroundProps) {
  const clampedIrradiance = Math.min(Math.max(irradiance, 0), 1000);
  const baseDuration = 12 - (clampedIrradiance / 1000) * 8;
  const baseOpacity = 0.25 + (clampedIrradiance / 1000) * 0.15;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      <div style={{ opacity: baseOpacity }} className="absolute inset-0">
        {BLOBS.map((blob, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              width: blob.size,
              height: blob.size * 0.7,
              marginLeft: -(blob.size / 2),
              marginTop: -((blob.size * 0.7) / 2),
              background: `radial-gradient(ellipse at center, ${blob.color} 0%, transparent 70%)`,
              filter: "blur(80px)",
            }}
            animate={{
              x: blob.drift.x,
              y: blob.drift.y,
              scale: [1, 1.08, 0.95, 1.05, 1],
            }}
            transition={{
              duration: baseDuration + i * 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
