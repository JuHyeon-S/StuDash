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
      className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
        active
          ? "bg-accent/15 text-accent border-accent/35"
          : "bg-transparent text-gray-500 border-panel-border hover:text-gray-300"
      }`}
    >
      {label}
    </button>
  );
}
