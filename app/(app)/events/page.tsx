"use client";

import { useState, useEffect } from "react";
import Panel from "../../components/Panel";
import PageHeader from "@/app/components/PageHeader";
import SearchBar from "@/app/components/SearchBar";
import FilterChip from "@/app/components/FilterChip";
import GridTable, { Column } from "@/app/components/GridTable";

type Severity = "critical" | "warning" | "info";

interface LogEntry {
  time: string;
  ip: string;
  type: string;
  target: string;
  action: string;
  severity: Severity;
}

const SEVERITY_STYLES: Record<Severity, string> = {
  critical: "bg-danger/15 text-danger",
  warning: "bg-warning/15 text-warning",
  info: "bg-info/15 text-info",
};

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
const IPS = [
  "185.220.101.47",
  "103.45.12.9",
  "45.155.204.88",
  "192.168.1.104",
  "91.242.68.3",
  "198.51.100.23",
  "203.0.113.77",
  "194.26.29.156",
  "45.146.164.110",
  "89.248.165.74",
  "5.188.206.18",
  "141.98.11.87",
  "172.104.22.9",
  "185.147.23.4",
  "77.83.36.19",
  "92.63.197.12",
  "43.129.10.55",
  "154.213.184.9",
  "94.102.61.7",
  "45.61.185.20",
];

const EVENT_TYPES: { type: string; severity: Severity }[] = [
  { type: "SQL Injection Attempt", severity: "critical" },
  { type: "Brute Force Login", severity: "warning" },
  { type: "Remote Code Execution", severity: "critical" },
  { type: "Unusual Login Location", severity: "info" },
  { type: "Port Scan Detected", severity: "warning" },
  { type: "DDoS Traffic Spike", severity: "critical" },
  { type: "New Device Login", severity: "info" },
  { type: "Malware Signature Match", severity: "critical" },
  { type: "Suspicious File Upload", severity: "warning" },
  { type: "API Rate Limit Exceeded", severity: "info" },
  { type: "Privilege Escalation Attempt", severity: "critical" },
  { type: "Credential Stuffing", severity: "warning" },
];

const TARGETS = [
  "web-01.prod",
  "web-02.prod",
  "api-03.prod",
  "db-02.prod",
  "auth-04.prod",
  "cache-05.prod",
];
const ACTIONS = [
  "Blocked",
  "Flagged",
  "Rate Limited",
  "Mitigated",
  "Quarantined",
  "Verified",
  "Throttled",
];

function generateLogs(count: number): LogEntry[] {
  const logs: LogEntry[] = [];
  let hour = 14,
    minute = 32,
    second = 7;

  for (let i = 0; i < count; i++) {
    const event = EVENT_TYPES[i % EVENT_TYPES.length];
    const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;

    logs.push({
      time,
      ip: IPS[i % IPS.length],
      type: event.type,
      target: TARGETS[i % TARGETS.length],
      action: ACTIONS[i % ACTIONS.length],
      severity: event.severity,
    });

    second -= 7;
    if (second < 0) {
      second += 60;
      minute -= 1;
    }
    if (minute < 0) {
      minute += 60;
      hour -= 1;
    }
    if (hour < 0) hour += 24;
  }

  return logs;
}

const logs: LogEntry[] = generateLogs(56);

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

  // 검색어/필터 바뀌면 1페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [search, severityFilter]);

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
        <GridTable columns={columns} data={pageItems}></GridTable>
      </Panel>
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="text-xs text-gray-400 disabled:opacity-30 px-3 py-1.5 rounded-md hover:bg-panel-border/30"
        >
          이전
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`text-xs w-8 h-8 rounded-md ${
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
          className="text-xs text-gray-400 disabled:opacity-30 px-3 py-1.5 rounded-md hover:bg-panel-border/30"
        >
          다음
        </button>
      </div>
    </div>
  );
}
