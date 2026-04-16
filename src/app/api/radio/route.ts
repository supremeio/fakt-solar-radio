import { NextResponse } from "next/server";

const GENRE_TAG_MAP: Record<string, string> = {
  Ambient: "ambient",
  Jazz: "jazz",
  Pop: "pop",
  Electronic: "electronic",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre") ?? "jazz";
  const tag = GENRE_TAG_MAP[genre] ?? genre.toLowerCase();

  try {
    const res = await fetch(
      `https://de1.api.radio-browser.info/json/stations/search?tag=${tag}&limit=50&order=votes&reverse=true&hidebroken=true&has_extended_info=true&lastcheckok=1`,
      {
        headers: { "User-Agent": "FAKTSolarRadio/1.0" },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) throw new Error(`Radio Browser API error: ${res.status}`);

    const stations = await res.json();

    // Filter for stations with working URLs and good metadata
    const BROWSER_CODECS = ["MP3", "AAC", "AAC+", "OGG", "OPUS"];
    const filtered = stations
      .filter(
        (s: { url_resolved: string; name: string; codec: string }) =>
          s.url_resolved &&
          s.name &&
          s.codec !== "UNKNOWN" &&
          BROWSER_CODECS.includes(s.codec.toUpperCase())
      )
      .map(
        (s: {
          stationuuid: string;
          name: string;
          url_resolved: string;
          favicon: string;
          tags: string;
          country: string;
        }) => ({
          id: s.stationuuid,
          name: s.name,
          url: s.url_resolved,
          favicon: s.favicon,
          tags: s.tags,
          country: s.country,
        })
      );

    return NextResponse.json({ stations: filtered });
  } catch (error) {
    console.error("Radio API error:", error);
    return NextResponse.json({ stations: [] }, { status: 200 });
  }
}
