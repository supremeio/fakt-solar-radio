export const SOLAR_BUCKETS = [
  { max: 100, name: "Quiet", description: "The sun is quiet" },
  { max: 300, name: "Waking", description: "The sun is waking" },
  { max: 600, name: "Shining", description: "The sun is shining" },
  { max: Infinity, name: "Blazing", description: "The sun is blazing" },
] as const;

export type SolarBucket = (typeof SOLAR_BUCKETS)[number];

export function getSolarBucketIndex(irradiance: number): number {
  const idx = SOLAR_BUCKETS.findIndex((b) => irradiance < b.max);
  return idx === -1 ? 0 : idx;
}

export function getSolarBucket(irradiance: number): SolarBucket {
  return SOLAR_BUCKETS[getSolarBucketIndex(irradiance)];
}

export const MAX_IRRADIANCE = 1000;

export interface GenrePresetBucket {
  name: string;
  tag: string;
}

export interface GenrePreset {
  id: string;
  name: string;
  buckets: [GenrePresetBucket, GenrePresetBucket, GenrePresetBucket, GenrePresetBucket];
}

export const GENRE_PRESETS: GenrePreset[] = [
  {
    id: "auto",
    name: "Auto (Solar Mix)",
    buckets: [
      { name: "Ambient", tag: "ambient" },
      { name: "Jazz", tag: "jazz" },
      { name: "Pop", tag: "pop" },
      { name: "Electronic", tag: "electronic" },
    ],
  },
  {
    id: "blues",
    name: "Blues",
    buckets: [
      { name: "Country Blues", tag: "country blues" },
      { name: "Classic Blues", tag: "blues" },
      { name: "Electric Blues", tag: "electric blues" },
      { name: "Blues Rock", tag: "blues rock" },
    ],
  },
  {
    id: "jazz",
    name: "Jazz",
    buckets: [
      { name: "Smooth Jazz", tag: "smooth jazz" },
      { name: "Classic Jazz", tag: "jazz" },
      { name: "Swing", tag: "swing" },
      { name: "Jazz Fusion", tag: "fusion" },
    ],
  },
  {
    id: "rock",
    name: "Rock",
    buckets: [
      { name: "Soft Rock", tag: "soft rock" },
      { name: "Classic Rock", tag: "classic rock" },
      { name: "Rock", tag: "rock" },
      { name: "Hard Rock", tag: "hard rock" },
    ],
  },
  {
    id: "pop",
    name: "Pop",
    buckets: [
      { name: "Indie Pop", tag: "indie pop" },
      { name: "Pop", tag: "pop" },
      { name: "Pop Rock", tag: "pop rock" },
      { name: "Dance Pop", tag: "dance pop" },
    ],
  },
  {
    id: "electronic",
    name: "Electronic",
    buckets: [
      { name: "Ambient", tag: "ambient" },
      { name: "Downtempo", tag: "downtempo" },
      { name: "House", tag: "house" },
      { name: "Techno", tag: "techno" },
    ],
  },
  {
    id: "hip-hop",
    name: "Hip-Hop",
    buckets: [
      { name: "Lo-Fi", tag: "lofi" },
      { name: "Hip-Hop", tag: "hip hop" },
      { name: "Rap", tag: "rap" },
      { name: "Trap", tag: "trap" },
    ],
  },
  {
    id: "classical",
    name: "Classical",
    buckets: [
      { name: "Chamber", tag: "chamber" },
      { name: "Baroque", tag: "baroque" },
      { name: "Classical", tag: "classical" },
      { name: "Orchestral", tag: "orchestral" },
    ],
  },
  {
    id: "reggae",
    name: "Reggae",
    buckets: [
      { name: "Dub", tag: "dub" },
      { name: "Roots Reggae", tag: "roots reggae" },
      { name: "Reggae", tag: "reggae" },
      { name: "Dancehall", tag: "dancehall" },
    ],
  },
];

export interface ResolvedSubgenre {
  tag: string;
  displayName: string;
  presetName: string;
}

export function resolveSubgenre(
  presetId: string,
  bucketIndex: number
): ResolvedSubgenre {
  const preset = GENRE_PRESETS.find((p) => p.id === presetId) ?? GENRE_PRESETS[0];
  const bucket = preset.buckets[bucketIndex] ?? preset.buckets[0];
  return {
    tag: bucket.tag,
    displayName: bucket.name,
    presetName: preset.name,
  };
}

export const SOLAR_ACTIVITIES: Record<string, string[]> = {
  Quiet: [
    "Settle in with a long book",
    "Brew something warm and slow",
    "Cook a proper meal, unhurried",
    "Put on a slow album and rest your eyes",
    "Write a letter or long email",
    "Light a candle, dim the room",
    "Call someone you haven't in a while",
    "Watch the light fade through the window",
  ],
  Waking: [
    "Linger over coffee",
    "Take a slow walk outside",
    "Sketch or journal for a few minutes",
    "Water your plants",
    "Plan something for later",
    "Tidy a single corner of your space",
    "Text a friend a good song",
    "Catch the golden hour if it's near",
  ],
  Shining: [
    "Meet a friend for lunch",
    "Move your body outside",
    "Tackle something creative",
    "Bike somewhere new",
    "Run errands on foot",
    "Shoot a few photos on the way",
    "Try a café you've never visited",
    "Read in a park",
  ],
  Blazing: [
    "Find shade or step inside",
    "Cool off with water",
    "Take a lazy siesta",
    "Keep sipping water",
    "Snack on something fresh and cold",
    "Wear a hat if you head out",
    "Put a fan on, curtains drawn",
    "Save the heavy work for later",
  ],
};

export const LOCATIONS = [
  { id: "amsterdam", name: "Amsterdam, NL", lat: 52.37, lon: 4.9 },
  { id: "london", name: "London, UK", lat: 51.51, lon: -0.13 },
  { id: "new-york", name: "New York, US", lat: 40.71, lon: -74.01 },
  { id: "tokyo", name: "Tokyo, JP", lat: 35.68, lon: 139.69 },
  { id: "sydney", name: "Sydney, AU", lat: -33.87, lon: 151.21 },
  { id: "lagos", name: "Lagos, NG", lat: 6.52, lon: 3.38 },
  { id: "dubai", name: "Dubai, AE", lat: 25.28, lon: 55.3 },
  { id: "sao-paulo", name: "São Paulo, BR", lat: -23.55, lon: -46.63 },
  { id: "paris", name: "Paris, FR", lat: 48.86, lon: 2.35 },
  { id: "nairobi", name: "Nairobi, KE", lat: -1.29, lon: 36.82 },
] as const;

export type Location = (typeof LOCATIONS)[number];
