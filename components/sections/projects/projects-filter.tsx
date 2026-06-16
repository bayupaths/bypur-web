interface ProjectsFilterProps {
  tags: string[];
  activeFilter: string;
  onFilterChange: (tag: string) => void;
}

export function ProjectsFilter({ tags, activeFilter, onFilterChange }: ProjectsFilterProps) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onFilterChange(tag)}
          className={`rounded-full border px-3.5 py-1 text-[11px] font-medium tracking-wide transition-all duration-150 ${
            activeFilter === tag
              ? "border-accent bg-accent text-accent-fg"
              : "border-border text-text-3 hover:border-text-3 hover:text-text-2"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
