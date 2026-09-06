import Panel from "./Panel";
import GridTable, { Column } from "./GridTable";

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
    header: "SEV",
    width: 80,
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
    header: "TIME",
    width: 80,
    render: (row) => <span className="font-mono">{row.time}</span>,
  },
  {
    key: "ip",
    header: "SOURCE IP",
    width: 120,
    render: (row) => <span className="font-mono">{row.ip}</span>,
  },
  { key: "type", header: "EVENT", flex: 2 },
  {
    key: "target",
    header: "TARGET",
    width: 140,
    render: (row) => (
      <span className="font-mono text-gray-500">{row.target}</span>
    ),
  },
  { key: "action", header: "ACTION", width: 100 },
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
];

export default function RecentEventsTable() {
  const total = 240;
  return (
    <Panel className="flex flex-col gap-3 h-80">
      <div className="flex justify-between">
        <div className="text-white">RECENT INTRUSION DETECTION EVENTS</div>
        <div className="flex gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            {total} events / 24h
          </span>
        </div>
      </div>
      <GridTable columns={columns} data={logs}></GridTable>
    </Panel>
  );
}
