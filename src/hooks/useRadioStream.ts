"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { RadioStation } from "@/lib/types";

interface UseRadioStreamReturn {
  isPlaying: boolean;
  isMuted: boolean;
  currentStation: RadioStation | null;
  stations: RadioStation[];
  loading: boolean;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  nextStation: () => void;
  prevStation: () => void;
}

export function useRadioStream(genre: string): UseRadioStreamReturn {
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [stationIndex, setStationIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentGenreRef = useRef(genre);

  // Fetch stations when genre changes
  useEffect(() => {
    if (!genre) return;
    currentGenreRef.current = genre;

    async function fetchStations() {
      setLoading(true);
      try {
        const res = await fetch(`/api/radio?genre=${encodeURIComponent(genre)}`);
        const data = await res.json();
        if (currentGenreRef.current === genre && data.stations?.length > 0) {
          setStations(data.stations);
          setStationIndex(0);
        }
      } catch {
        // Keep current stations on error
      } finally {
        setLoading(false);
      }
    }

    fetchStations();
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

    if (wasPlaying) {
      audio.play().catch(() => {
        // Stream might fail, try next station
        if (stations.length > 1) {
          setStationIndex((prev) => (prev + 1) % stations.length);
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

  const play = useCallback(() => {
    const audio = audioRef.current;
    const station = stations[stationIndex];
    if (!audio || !station) return;

    if (!audio.src || audio.src !== station.url) {
      audio.src = station.url;
    }
    audio.play().catch(() => {
      // Try next station if current fails
      if (stations.length > 1) {
        setStationIndex((prev) => (prev + 1) % stations.length);
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

  const nextStation = useCallback(() => {
    if (stations.length === 0) return;
    setStationIndex((prev) => (prev + 1) % stations.length);
  }, [stations.length]);

  const prevStation = useCallback(() => {
    if (stations.length === 0) return;
    setStationIndex((prev) => (prev - 1 + stations.length) % stations.length);
  }, [stations.length]);

  const currentStation = stations[stationIndex] ?? null;

  return {
    isPlaying,
    isMuted,
    currentStation,
    stations,
    loading,
    play,
    pause,
    togglePlay,
    toggleMute,
    nextStation,
    prevStation,
  };
}
