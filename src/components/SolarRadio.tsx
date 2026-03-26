"use client";

import { useSolarData } from "@/hooks/useSolarData";
import { useRadioStream } from "@/hooks/useRadioStream";
import Background from "./Background";
import SolarGauge from "./SolarGauge";
import RadioDetails from "./RadioDetails";
import SongInfo from "./SongInfo";
import PlayerControls from "./PlayerControls";
import ForecastChart from "./ForecastChart";
import LocationBadge from "./LocationBadge";

export default function SolarRadio() {
  const { currentIrradiance, hourlyForecast, description, genre } =
    useSolarData();

  const radio = useRadioStream(genre);

  return (
    <div className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden bg-black">
      <Background irradiance={currentIrradiance} />

      {/* Main content container - centered */}
      <div className="relative z-10 flex items-center justify-center w-full min-h-screen py-[40px] px-[16px]">
        <div className="flex flex-col gap-[40px] items-center w-full max-w-[447.5px]">
          {/* Glass card */}
          <div className="flex flex-col gap-[24px] items-center px-[16px] py-[32px] md:px-[24px] md:py-[40px] w-full bg-white/10 rounded-[24px]">
            <SolarGauge value={currentIrradiance} />

            <div className="flex flex-col gap-[40px] items-center w-full max-w-[290px]">
              <RadioDetails genre={genre} description={description} />
              <SongInfo
                stationName={radio.currentStation?.name ?? "Solar radio"}
                isPlaying={radio.isPlaying}
              />
              <PlayerControls
                isPlaying={radio.isPlaying}
                isMuted={radio.isMuted}
                onTogglePlay={radio.togglePlay}
                onToggleMute={radio.toggleMute}
                onNext={radio.nextStation}
                onPrev={radio.prevStation}
              />
            </div>
          </div>

          {/* Forecast section */}
          <div className="flex flex-col gap-[48px] items-center w-full">
            <ForecastChart hourlyData={hourlyForecast} />
            <LocationBadge />
          </div>
        </div>
      </div>
    </div>
  );
}
