interface HeroHeaderProps {
  city: string;
  description: string;
  displayName: string;
}

export default function HeroHeader({
  city,
  description,
  displayName,
}: HeroHeaderProps) {
  const cityShort = city.split(",")[0];
  const narrative = `Right now in ${cityShort}, ${description.toLowerCase()} — playing ${displayName}.`;

  return (
    <div className="flex flex-col items-center gap-[8px] md:gap-[10px] text-center w-full max-w-[520px] mb-[20px] md:mb-[28px]">
      <p className="text-[10px] md:text-[11px] text-wood-dark/60 uppercase tracking-[0.3em] font-medium">
        FAKT Solar Radio
      </p>
      <h1 className="font-[family-name:var(--font-playfair)] font-bold text-[28px] md:text-[36px] text-wood-dark leading-[1.1] px-[12px]">
        A radio tuned by the sun
      </h1>
      <p className="text-[13px] md:text-[15px] text-wood-dark/70 italic leading-snug px-[12px]">
        {narrative}
      </p>
    </div>
  );
}
