"use client";

import { useState } from "react";
import Panel from "../../components/Panel";
import PageHeader from "@/app/components/PageHeader";
import SearchBar from "@/app/components/SearchBar";
import FilterChip from "@/app/components/FilterChip";
import GridTable, { Column } from "@/app/components/GridTable";
import { EVENTS, SEVERITY_STYLES, type LogEntry } from "@/app/lib/events";

const columns: Column<LogEntry>[] = [
  {
    key: "severity",
    header: "SEVERITY",
    width: 90,
    render: (row) => (
      <span
        className={`w-fit text-[10px] font-bold px-2 py-0.5 rounded ${SEVERITY_STYLES[row.severity]}`}
      >
        {row.severity.toUpperCase()}
      </span>
    ),
  },
  {
    key: "time",
    header: "TIMESTAMP",
    width: 130,
    render: (row) => <span className="font-mono">{row.time}</span>,
  },
  {
    key: "ip",
    header: "SOURCE IP",
    width: 140,
    render: (row) => <span className="font-mono">{row.ip}</span>,
  },
  { key: "type", header: "EVENT TYPE", flex: 2 },
  {
    key: "target",
    header: "TARGET",
    width: 120,
    render: (row) => (
      <span className="font-mono text-gray-500">{row.target}</span>
    ),
  },
  { key: "action", header: "ACTION", width: 110 },
];
const logs: LogEntry[] = EVENTS;

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState<
    "All" | "critical" | "warning" | "info"
  >("All");
  const filtered = logs.filter((log) => {
    const matchesSearch =
      log.ip.includes(search) ||
      log.type.includes(search) ||
      log.target.includes(search);
    const matchesSeverity =
      severityFilter === "All" || log.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const PAGE_SIZE = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // 검색어/필터가 바뀌면 1페이지로 리셋.
  // useEffect로 setState하면 렌더가 한 번 더 발생해서(react-hooks/set-state-in-effect),
  // React 공식 문서가 권장하는 "렌더 중 이전 값과 비교해서 조정" 패턴으로 처리.
  const [prevFilters, setPrevFilters] = useState({ search, severityFilter });
  if (prevFilters.search !== search || prevFilters.severityFilter !== severityFilter) {
    setPrevFilters({ search, severityFilter });
    setCurrentPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="p-6 flex flex-col gap-4">
      <PageHeader
        title="Event Log"
        subtitle="전체 침입 탐지 이벤트 로그"
        right={
          <span className="font-mono text-xs text-gray-500">
            총 {filtered.length}건 · 최근 24시간
          </span>
        }
      ></PageHeader>
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="IP, 이벤트명, 대상 서버로 검색..."
      />
      <div className="flex gap-2">
        {["All", "critical", "warning", "info"].map((f) => (
          <FilterChip
            key={f}
            label={f === "All" ? f : f[0].toUpperCase() + f.slice(1)}
            active={severityFilter === f}
            onClick={() => setSeverityFilter(f as typeof severityFilter)}
          />
        ))}
      </div>
      <Panel>
        <GridTable
          columns={columns}
          data={pageItems}
          rowKey={(row) => row.id}
          getRowHref={(row) => `/events/${row.id}`}
          getRowLabel={(row) =>
            `${row.type} 이벤트 상세보기, 심각도 ${row.severity}, ${row.time} 발생, 대상 ${row.target}`
          }
          ariaLabel="침입 탐지 이벤트 로그"
        ></GridTable>
      </Panel>
      <nav
        aria-label="이벤트 로그 페이지네이션"
        className="flex items-center justify-center gap-2"
      >
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          aria-label="이전 페이지"
          className="text-xs text-gray-400 disabled:opacity-30 px-3 py-1.5 rounded-md hover:bg-panel-border/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          이전
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            aria-label={`${page} 페이지`}
            aria-current={page === currentPage ? "page" : undefined}
            className={`text-xs w-8 h-8 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
              page === currentPage
                ? "bg-accent/15 text-accent font-bold"
                : "text-gray-400 hover:bg-panel-border/30"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          aria-label="다음 페이지"
          className="text-xs text-gray-400 disabled:opacity-30 px-3 py-1.5 rounded-md hover:bg-panel-border/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          다음
        </button>
      </nav>
    </div>
  );
}
