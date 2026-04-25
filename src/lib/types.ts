export interface SolarData {
  currentIrradiance: number;
  hourlyForecast: number[];
  description: string;
  bucketIndex: number;
  bucketName: string;
}

export interface RadioStation {
  id: string;
  name: string;
  url: string;
  favicon: string;
  tags: string;
  country: string;
}

export interface RadioState {
  isPlaying: boolean;
  isMuted: boolean;
  currentStation: RadioStation | null;
  stations: RadioStation[];
  loading: boolean;
}
