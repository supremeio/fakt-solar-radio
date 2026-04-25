interface ConnectorCaptionProps {
  value: number;
  description: string;
  displayName: string;
}

export default function ConnectorCaption({
  value,
  description,
  displayName,
}: ConnectorCaptionProps) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-x-[8px] md:gap-x-[10px] gap-y-[2px] text-[10px] md:text-[11px] mt-[14px] md:mt-[18px]">
      <span className="text-cream/45 tabular-nums font-medium tracking-[0.05em]">
        {Math.round(value)} W/m²
      </span>
      <span className="text-cream/25">·</span>
      <span className="text-cream/55 italic font-medium">
        {description.toLowerCase()}
      </span>
      <span className="text-cream/25">→</span>
      <span className="text-cream/80 font-medium uppercase tracking-[0.12em]">
        {displayName}
      </span>
    </div>
  );
}
