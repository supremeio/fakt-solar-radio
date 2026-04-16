"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { RadioStation } from "@/lib/types";

interface UseRadioStreamReturn {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentStation: RadioStation | null;
  stations: RadioStation[];
  loading: boolean;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (v: number) => void;
  nextStation: () => void;
  prevStation: () => void;
}

const MAX_RETRIES = 10;

export function useRadioStream(genre: string): UseRadioStreamReturn {
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [stationIndex, setStationIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.75);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const retriesRef = useRef(0);

  // Fetch stations when genre changes
  useEffect(() => {
    if (!genre) return;

    const controller = new AbortController();

    async function fetchStations() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/radio?genre=${encodeURIComponent(genre)}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (data.stations?.length > 0) {
          setStations(data.stations);
          setStationIndex(0);
          retriesRef.current = 0;
        }
      } catch {
        // Keep current stations on error or abort
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchStations();
    return () => controller.abort();
  }, [genre]);

  // Manage audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = "anonymous";
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Update audio source when station changes
  useEffect(() => {
    const audio = audioRef.current;
    const station = stations[stationIndex];
    if (!audio || !station) return;

    const wasPlaying = isPlaying;
    audio.src = station.url;
    audio.muted = isMuted;
    audio.volume = volume;

    if (wasPlaying) {
      audio.play().catch(() => {
        // Only retry up to MAX_RETRIES to prevent rapid cycling
        if (stations.length > 1 && retriesRef.current < MAX_RETRIES) {
          retriesRef.current += 1;
          // Small delay before trying next station to prevent flickering
          setTimeout(() => {
            setStationIndex((prev) => (prev + 1) % stations.length);
          }, 500);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stations, stationIndex]);

  // Sync mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    const station = stations[stationIndex];
    if (!audio || !station) return;

    if (!audio.src || audio.src !== station.url) {
      audio.src = station.url;
    }
    retriesRef.current = 0;
    audio.play().catch(() => {
      if (stations.length > 1 && retriesRef.current < MAX_RETRIES) {
        retriesRef.current += 1;
        setTimeout(() => {
          setStationIndex((prev) => (prev + 1) % stations.length);
        }, 500);
      }
    });
    setIsPlaying(true);
  }, [stations, stationIndex]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(Math.max(0, Math.min(1, v)));
  }, []);

  const nextStation = useCallback(() => {
    if (stations.length === 0) return;
    retriesRef.current = 0;
    setStationIndex((prev) => (prev + 1) % stations.length);
  }, [stations.length]);

  const prevStation = useCallback(() => {
    if (stations.length === 0) return;
    retriesRef.current = 0;
    setStationIndex((prev) => (prev - 1 + stations.length) % stations.length);
  }, [stations.length]);

  const currentStation = stations[stationIndex] ?? null;

  return {
    isPlaying,
    isMuted,
    volume,
    currentStation,
    stations,
    loading,
    play,
    pause,
    togglePlay,
    toggleMute,
    setVolume,
    nextStation,
    prevStation,
  };
}
