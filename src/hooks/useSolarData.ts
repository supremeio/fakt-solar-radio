"use client";

import { useState, useEffect } from "react";
import { getSolarMood } from "@/lib/constants";
import type { SolarData } from "@/lib/types";

export function useSolarData(): SolarData {
  const [data, setData] = useState<SolarData>({
    currentIrradiance: 25,
    hourlyForecast: new Array(25).fill(0),
    description: "The sun is quiet",
    genre: "Jazz",
  });

  useEffect(() => {
    async function fetchSolarData() {
      try {
        const res = await fetch("/api/solar");
        const json = await res.json();
        const mood = getSolarMood(json.currentIrradiance);
        setData({
          currentIrradiance: json.currentIrradiance,
          hourlyForecast: json.hourlyForecast,
          ...mood,
        });
      } catch {
        // Keep default values on error
      }
    }

    fetchSolarData();
    const interval = setInterval(fetchSolarData, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return data;
}
