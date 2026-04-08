"use client";

import { cn } from "@/lib/utils";

interface ProjectFilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { value: "all", label: "All" },
  { value: "ml", label: "ML" },
  { value: "data", label: "Data" },
  { value: "engineering", label: "Engineering" },
];

export function ProjectFilterTabs({
  activeFilter,
  onFilterChange,
}: ProjectFilterTabsProps) {
  return (
    <div className="mb-8 inline-flex rounded-xl bg-white p-1.5 shadow-sm border border-gray-200">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-all",
            activeFilter === filter.value
              ? "bg-brand-600 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
