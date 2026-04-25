interface RadioDetailsProps {
  displayName: string;
  description: string;
}

export default function RadioDetails({
  displayName,
  description,
}: RadioDetailsProps) {
  return (
    <div className="flex flex-col items-center gap-[12px] text-center w-full max-w-[280px]">
      <p className="text-[12px] md:text-[14px] text-cream-dark/60 uppercase tracking-[0.2em] font-medium">
        Solar Radio
      </p>
      <div className="flex flex-col items-center gap-[4px]">
        <p className="font-[family-name:var(--font-playfair)] font-bold text-[36px] md:text-[42px] text-cream leading-tight">
          {displayName}
        </p>
        <p className="text-[14px] md:text-[16px] text-cream/50 font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}
