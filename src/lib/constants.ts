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

export const SOLAR_ACTIVITIES: Record<string, string[]> = {
  Ambient: [
    "Settle in with a long book",
    "Brew something warm and slow",
    "Cook a proper meal, unhurried",
    "Put on a slow album and rest your eyes",
    "Write a letter or long email",
    "Light a candle, dim the room",
    "Call someone you haven't in a while",
    "Watch the light fade through the window",
  ],
  Jazz: [
    "Linger over coffee",
    "Take a slow walk outside",
    "Sketch or journal for a few minutes",
    "Water your plants",
    "Plan something for later",
    "Tidy a single corner of your space",
    "Text a friend a good song",
    "Catch the golden hour if it's near",
  ],
  Pop: [
    "Meet a friend for lunch",
    "Move your body outside",
    "Tackle something creative",
    "Bike somewhere new",
    "Run errands on foot",
    "Shoot a few photos on the way",
    "Try a café you've never visited",
    "Read in a park",
  ],
  Electronic: [
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
