import Link from "next/link";

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
  rowKey,
  getRowHref,
  getRowLabel,
  ariaLabel,
}: {
  columns: Column<T>[];
  data: T[];
  /** 행의 React key로 쓸 값. 생략하면 배열 인덱스를 사용 */
  rowKey?: (row: T, index: number) => string | number;
  /** 지정하면 행 전체가 이 경로로 이동하는 링크가 됨 (마우스 클릭 + 키보드 Tab/Enter 모두 지원) */
  getRowHref?: (row: T) => string;
  /** 클릭 가능한 행의 스크린리더용 설명 (예: "SQL Injection Attempt 이벤트 상세보기") */
  getRowLabel?: (row: T) => string;
  /** 테이블 전체를 설명하는 접근성 이름 (스크린리더용) */
  ariaLabel?: string;
}) {
  const gridStyle = {
    gridTemplateColumns: columns
      .map((c) => (c.width ? `${c.width}px` : `${c.flex ?? 1}fr`))
      .join(" "),
  };

  const rowClassName =
    "grid items-center py-2 border-b border-panel-border/60 text-xs text-gray-300";

  return (
    <div
      className="flex flex-col flex-1 min-h-0"
      role="table"
      aria-label={ariaLabel}
    >
      <div
        role="row"
        className="grid text-[10px] font-semibold text-gray-500 tracking-wide pb-2 border-b border-panel-border shrink-0"
        style={gridStyle}
      >
        {columns.map((c) => (
          <div key={String(c.key)} role="columnheader">
            {c.header}
          </div>
        ))}
      </div>
      <div
        role="rowgroup"
        className="flex-1 min-h-0 overflow-y-auto scroll-thin"
      >
        {data.map((d, i) => {
          const key = rowKey ? rowKey(d, i) : i;
          const cells = columns.map((c) => (
            <div key={String(c.key)} role="cell" className="min-w-0 truncate">
              {c.render ? c.render(d) : String(d[c.key])}
            </div>
          ));

          if (getRowHref) {
            return (
              <Link
                key={key}
                href={getRowHref(d)}
                role="row"
                aria-label={getRowLabel?.(d)}
                style={gridStyle}
                className={`${rowClassName} cursor-pointer hover:bg-panel-border/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:-outline-offset-2 transition-colors`}
              >
                {cells}
              </Link>
            );
          }

          return (
            <div key={key} role="row" className={rowClassName} style={gridStyle}>
              {cells}
            </div>
          );
        })}
      </div>
    </div>
  );
}
