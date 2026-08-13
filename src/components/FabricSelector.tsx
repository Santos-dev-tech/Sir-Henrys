"use client";

import type { FabricOption } from "@/lib/types";

interface FabricSelectorProps {
  options: FabricOption[];
  selected: string | null;
  onSelect: (value: string) => void;
}

export default function FabricSelector({
  options,
  selected,
  onSelect,
}: FabricSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            aria-label={`Select fabric: ${option.label}`}
            className={`h-11 px-4 border font-ui text-[12px] tracking-[0.06em] transition-all duration-200 ${
              isSelected
                ? "bg-navy text-offwhite border-navy"
                : "bg-transparent text-primary border-hairline hover:border-brass"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
