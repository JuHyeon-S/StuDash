export default function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
        active
          ? "bg-accent/15 text-accent border-accent/35"
          : "bg-transparent text-gray-500 border-panel-border hover:text-gray-300"
      }`}
    >
      {label}
    </button>
  );
}
