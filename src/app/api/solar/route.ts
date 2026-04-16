import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const lat = parseFloat(searchParams.get("lat") ?? "52.37");
    const lon = parseFloat(searchParams.get("lon") ?? "4.9");

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=shortwave_radiation&current=shortwave_radiation&forecast_days=1`,
      { next: { revalidate: 300 } } // cache 5 minutes
    );

    if (!res.ok) {
      throw new Error(`Open-Meteo API error: ${res.status}`);
    }

    const data = await res.json();
    const currentIrradiance: number =
      data.current?.shortwave_radiation ?? 0;
    const hourlyRadiation: number[] =
      data.hourly?.shortwave_radiation ?? [];

    return NextResponse.json({
      currentIrradiance,
      hourlyForecast: hourlyRadiation.slice(0, 25),
    });
  } catch (error) {
    console.error("Solar API error:", error);
    return NextResponse.json(
      { currentIrradiance: 25, hourlyForecast: new Array(25).fill(0) },
      { status: 200 }
    );
  }
}
