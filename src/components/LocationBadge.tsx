import { LOCATIONS } from "@/lib/constants";
import type { Location } from "@/lib/constants";

interface LocationBadgeProps {
  location: Location;
  onLocationChange: (location: Location) => void;
}

export default function LocationBadge({
  location,
  onLocationChange,
}: LocationBadgeProps) {
  return (
    <div className="flex gap-[8px] items-center opacity-40 relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/location-pin.svg"
        alt=""
        className="w-[16px] h-[16px] flex-shrink-0"
      />
      <p className="font-medium text-[16px] leading-normal text-white text-center whitespace-nowrap">
        {location.name}
      </p>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[24px] h-[24px] flex-shrink-0"
      >
        <path
          d="M6 9L12 15L18 9"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <select
        value={location.id}
        onChange={(e) => {
          const selected = LOCATIONS.find((l) => l.id === e.target.value);
          if (selected) onLocationChange(selected);
        }}
        className="absolute inset-0 opacity-0 cursor-pointer"
      >
        {LOCATIONS.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>
    </div>
  );
}
