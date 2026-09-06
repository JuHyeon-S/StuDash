"use client";

import { useState } from "react";
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

const logs: LogEntry[] = [
  {
    time: "14:32:07",
    ip: "185.220.101.47",
    type: "SQL Injection Attempt",
    target: "db-02.prod",
    action: "Blocked",
    severity: "critical",
  },
  {
    time: "14:29:51",
    ip: "103.45.12.9",
    type: "Brute Force Login",
    target: "auth-04.prod",
    action: "Rate Limited",
    severity: "warning",
  },
  {
    time: "14:26:18",
    ip: "45.155.204.88",
    type: "Remote Code Execution",
    target: "api-03.prod",
    action: "Blocked",
    severity: "critical",
  },
  {
    time: "14:21:40",
    ip: "192.168.1.104",
    type: "Unusual Login Location",
    target: "web-01.prod",
    action: "Flagged",
    severity: "info",
  },
  {
    time: "14:18:02",
    ip: "91.242.68.3",
    type: "Port Scan Detected",
    target: "cache-05.prod",
    action: "Blocked",
    severity: "warning",
  },
  {
    time: "14:12:55",
    ip: "198.51.100.23",
    type: "DDoS Traffic Spike",
    target: "web-01.prod",
    action: "Mitigated",
    severity: "critical",
  },
  {
    time: "14:05:33",
    ip: "203.0.113.77",
    type: "New Device Login",
    target: "auth-04.prod",
    action: "Verified",
    severity: "info",
  },
  {
    time: "13:58:14",
    ip: "194.26.29.156",
    type: "Malware Signature Match",
    target: "db-02.prod",
    action: "Quarantined",
    severity: "critical",
  },
  {
    time: "13:47:02",
    ip: "45.146.164.110",
    type: "Suspicious File Upload",
    target: "web-02.prod",
    action: "Blocked",
    severity: "warning",
  },
  {
    time: "13:39:45",
    ip: "89.248.165.74",
    type: "API Rate Limit Exceeded",
    target: "api-03.prod",
    action: "Throttled",
    severity: "info",
  },
  {
    time: "13:22:31",
    ip: "5.188.206.18",
    type: "Privilege Escalation Attempt",
    target: "auth-04.prod",
    action: "Blocked",
    severity: "critical",
  },
  {
    time: "13:10:09",
    ip: "141.98.11.87",
    type: "Credential Stuffing",
    target: "web-01.prod",
    action: "Blocked",
    severity: "warning",
  },
];
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
        <GridTable columns={columns} data={filtered}></GridTable>
      </Panel>
    </div>
  );
}
