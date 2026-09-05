export interface Column<T> {
  key: keyof T;
  header: string;
  width?: number; // px
  flex?: number; // 비율 (기본 1)
  render?: (row: T) => React.ReactNode;
}
export default function GridTable<T>({
  columns,
  data,
}: {
  columns: Column<T>[];
  data: T[];
}) {
  const gridStyle = {
    gridTemplateColumns: columns
      .map((c) => (c.width ? `${c.width}px` : `${c.flex ?? 1}fr`))
      .join(" "),
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div
        className="grid text-[10px] font-semibold text-gray-500 tracking-wide pb-2 border-b border-panel-border shrink-0"
        style={gridStyle}
      >
        {columns.map((c) => (
          <div key={String(c.key)}>{c.header}</div>
        ))}
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto scroll-thin">
        {data.map((d, i) => (
          <div
            key={i}
            className="grid items-center py-2 border-b border-panel-border/60 text-xs text-gray-300"
            style={gridStyle}
          >
            {columns.map((c) => (
              <div key={String(c.key)} className="min-w-0 truncate">
                {c.render ? c.render(d) : String(d[c.key])}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
