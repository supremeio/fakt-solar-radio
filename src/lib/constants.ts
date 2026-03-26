export const SOLAR_MOODS = [
  { max: 100, description: "The sun is quiet", genre: "Ambient" },
  { max: 300, description: "The sun is waking", genre: "Jazz" },
  { max: 600, description: "The sun is shining", genre: "Pop" },
  { max: Infinity, description: "The sun is blazing", genre: "Electronic" },
] as const;

export function getSolarMood(irradiance: number) {
  const mood = SOLAR_MOODS.find((m) => irradiance < m.max) ?? SOLAR_MOODS[0];
  return { description: mood.description, genre: mood.genre };
}

export const MAX_IRRADIANCE = 1000;
