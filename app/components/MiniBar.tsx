export function MiniBar({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: number;
  colorClass: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex justify-between text-[8.5px] text-gray-500">
        <span>{label}</span>
        <span className="font-mono">{value}%</span>
      </div>
      <div className="w-full h-1 rounded-full bg-panel-border overflow-hidden">
        <div
          className={`h-full ${colorClass}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
