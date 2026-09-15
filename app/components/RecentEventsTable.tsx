import Panel from "./Panel";
import GridTable, { Column } from "./GridTable";
import { EVENTS, SEVERITY_STYLES, type LogEntry } from "../lib/events";

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

const recentEvents = EVENTS.slice(0, 7);

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
      <GridTable
        columns={columns}
        data={recentEvents}
        rowKey={(row) => row.id}
        getRowHref={(row) => `/events/${row.id}`}
        getRowLabel={(row) =>
          `${row.type} 이벤트 상세보기, 심각도 ${row.severity}, ${row.time} 발생`
        }
        ariaLabel="최근 침입 탐지 이벤트"
      ></GridTable>
    </Panel>
  );
}
