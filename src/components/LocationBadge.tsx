export default function LocationBadge() {
  return (
    <div className="flex gap-[8px] items-center opacity-40">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/location-pin.svg"
        alt=""
        className="w-[16px] h-[16px] flex-shrink-0"
      />
      <p className="font-medium text-[16px] leading-normal text-white text-center whitespace-nowrap">
        Amsterdam, NL
      </p>
    </div>
  );
}
