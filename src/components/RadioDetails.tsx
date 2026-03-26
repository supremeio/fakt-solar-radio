interface RadioDetailsProps {
  genre: string;
  description: string;
}

export default function RadioDetails({ genre, description }: RadioDetailsProps) {
  return (
    <div className="flex flex-col items-center gap-[20px] leading-normal text-center w-[192px]">
      <p className="font-medium text-[20px] text-white/50 uppercase w-full">
        Solar Radio
      </p>
      <div className="flex flex-col items-center w-full">
        <p className="font-bold text-[40px] text-white w-full">
          {genre}
        </p>
        <p className="font-medium text-[16px] text-white/50 w-full">
          {description}
        </p>
      </div>
    </div>
  );
}
