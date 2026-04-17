"use client";

import { useState } from "react";
import { LOCATIONS } from "@/lib/constants";
import type { Location } from "@/lib/constants";
import { useSolarData } from "@/hooks/useSolarData";
import { useRadioStream } from "@/hooks/useRadioStream";
import Background from "./Background";
import SolarGauge from "./SolarGauge";
import RadioDetails from "./RadioDetails";
import SongInfo from "./SongInfo";
import PlayerControls from "./PlayerControls";
import ForecastChart from "./ForecastChart";
import LocationBadge from "./LocationBadge";
import HeroHeader from "./HeroHeader";
import ConnectorCaption from "./ConnectorCaption";
import HowItWorks from "./HowItWorks";
import IntroOverlay from "./IntroOverlay";

export default function SolarRadio() {
  const [location, setLocation] = useState<Location>(LOCATIONS[0]);

  const { currentIrradiance, hourlyForecast, description, genre } =
    useSolarData(location.lat, location.lon);

  const radio = useRadioStream(genre);

  return (
    <div className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden">
      <Background irradiance={currentIrradiance} />

      <IntroOverlay />

      <div className="relative z-10 flex items-start justify-center w-full min-h-screen py-[32px] md:py-[48px] px-[16px] md:px-[24px]">
        <div className="flex flex-col items-center w-full max-w-[520px] md:max-w-[960px]">
          {/* Hero header */}
          <HeroHeader
            city={location.name}
            description={description}
            genre={genre}
          />

          {/* Radio + explainer side-by-side on desktop, stacked on mobile */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-[20px] md:gap-[24px] w-full">
          {/* Radio outer frame */}
          <div
            className="w-full max-w-[520px] md:flex-1 md:max-w-none rounded-[18px] p-[6px] md:p-[8px]"
            style={{
              background:
                "linear-gradient(180deg, #C09A6E 0%, #A07848 30%, #8B5E3C 60%, #6B4520 100%)",
              boxShadow:
                "0 12px 40px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            {/* Radio inner body */}
            <div
              className="w-full rounded-[14px] overflow-hidden"
              style={{
                background: `
                  repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.018) 3px, rgba(0,0,0,0.018) 6px),
                  repeating-linear-gradient(180deg, transparent 0px, transparent 50px, rgba(0,0,0,0.015) 50px, rgba(0,0,0,0.015) 52px),
                  linear-gradient(180deg, #A67C52 0%, #96693F 10%, #8B5E3C 25%, #9B6B45 40%, #8B5E3C 55%, #A07050 70%, #8B5E3C 85%, #7A4F30 100%)
                `,
              }}
            >
              <div className="px-[14px] pt-[14px] pb-[12px] md:px-[20px] md:pt-[20px] md:pb-[16px] flex flex-col">
                {/* Dial panel */}
                <SolarGauge value={currentIrradiance} />

                {/* Connector caption linking dial → genre */}
                <ConnectorCaption
                  value={currentIrradiance}
                  description={description}
                  genre={genre}
                />

                {/* Station info area */}
                <div className="flex flex-col items-center gap-[16px] pt-[16px] pb-[24px] md:pt-[18px] md:pb-[28px]">
                  <RadioDetails genre={genre} description={description} />
                  <SongInfo
                    stationName={radio.currentStation?.name ?? "Solar radio"}
                    isPlaying={radio.isPlaying}
                    searching={radio.loading || radio.searching}
                  />
                </div>

                {/* Forecast panel */}
                <ForecastChart hourlyData={hourlyForecast} />

                {/* Controls: knobs + location presets */}
                <PlayerControls
                  isPlaying={radio.isPlaying}
                  volume={radio.volume}
                  onTogglePlay={radio.togglePlay}
                  onVolumeChange={radio.setVolume}
                >
                  <LocationBadge
                    location={location}
                    onLocationChange={setLocation}
                  />
                </PlayerControls>
              </div>
            </div>
          </div>

          {/* How it works explainer card */}
          <div className="w-full max-w-[520px] md:flex-1 md:max-w-none md:mt-0">
            <HowItWorks city={location.name} currentGenre={genre} />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
