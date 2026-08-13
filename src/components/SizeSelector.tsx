"use client";

interface SizeSelectorProps {
  sizes: string[];
  selected: string | null;
  onSelect: (size: string) => void;
  outOfStockSizes?: string[];
}

export default function SizeSelector({
  sizes,
  selected,
  onSelect,
  outOfStockSizes = [],
}: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => {
        const isOOS = outOfStockSizes.includes(size);
        const isSelected = selected === size;

        return (
          <button
            key={size}
            onClick={() => !isOOS && onSelect(size)}
            disabled={isOOS}
            aria-label={isOOS ? `${size} — out of stock` : `Select size ${size}`}
            className={`min-w-[48px] h-11 px-3 border font-ui text-[12px] tracking-[0.06em] transition-all duration-200 ${
              isOOS
                ? "oos-strike border-hairline text-primary bg-transparent"
                : isSelected
                ? "bg-navy text-offwhite border-navy"
                : "bg-transparent text-primary border-hairline hover:border-brass"
            }`}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
