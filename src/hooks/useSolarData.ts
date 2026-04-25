"use client";

import { useState, useEffect } from "react";
import { getSolarBucket, getSolarBucketIndex } from "@/lib/constants";
import type { SolarData } from "@/lib/types";

export function useSolarData(lat: number, lon: number): SolarData {
  const [data, setData] = useState<SolarData>(() => {
    const initialIrradiance = 25;
    const bucket = getSolarBucket(initialIrradiance);
    return {
      currentIrradiance: initialIrradiance,
      hourlyForecast: new Array(25).fill(0),
      description: bucket.description,
      bucketIndex: getSolarBucketIndex(initialIrradiance),
      bucketName: bucket.name,
    };
  });

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSolarData() {
      try {
        const res = await fetch(`/api/solar?lat=${lat}&lon=${lon}`, {
          signal: controller.signal,
        });
        const json = await res.json();
        const irradiance = json.currentIrradiance;
        const bucket = getSolarBucket(irradiance);
        setData({
          currentIrradiance: irradiance,
          hourlyForecast: json.hourlyForecast,
          description: bucket.description,
          bucketIndex: getSolarBucketIndex(irradiance),
          bucketName: bucket.name,
        });
      } catch {
        // Keep default values on error or abort
      }
    }

    fetchSolarData();
    const interval = setInterval(fetchSolarData, 5 * 60 * 1000);
    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [lat, lon]);

  return data;
}
