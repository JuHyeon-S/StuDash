import { MiniBar } from "./MiniBar";
import Panel from "./Panel";
type ServerHealth = "online" | "degraded" | "offline";

interface ServerStatus {
  name: string;
  region: string;
  status: ServerHealth;
  cpu: number;
  ram: number;
  uptime: string;
}
const STATUS_STYLES: Record<ServerHealth, { dot: string; text: string }> = {
  online: { dot: "bg-safe", text: "text-safe" },
  degraded: { dot: "bg-warning", text: "text-warning" },
  offline: { dot: "bg-gray-500", text: "text-gray-400" },
};

const servers: ServerStatus[] = [
  {
    name: "web-01.prod",
    region: "us-east-1",
    status: "online",
    cpu: 42,
    ram: 61,
    uptime: "46d 12h",
  },
  {
    name: "web-02.prod",
    region: "us-east-1",
    status: "online",
    cpu: 38,
    ram: 55,
    uptime: "46d 12h",
  },
  {
    name: "api-03.prod",
    region: "us-west-2",
    status: "degraded",
    cpu: 87,
    ram: 79,
    uptime: "12d 3h",
  },
  {
    name: "db-02.prod",
    region: "us-west-2",
    status: "online",
    cpu: 64,
    ram: 71,
    uptime: "92d 5h",
  },
  {
    name: "auth-04.prod",
    region: "eu-central-1",
    status: "online",
    cpu: 29,
    ram: 44,
    uptime: "46d 12h",
  },
  {
    name: "cache-05.prod",
    region: "eu-central-1",
    status: "offline",
    cpu: 0,
    ram: 0,
    uptime: "—",
  },
];
export default function ServerStatusGrid() {
  return (
    <Panel className="flex flex-col gap-3 h-80">
      <div className="text-white">SERVER FLEET STATUS</div>
      <div className="grid grid-cols-3 gap-2">
        {servers.map((server) => {
          const style = STATUS_STYLES[server.status];
          return (
            <div
              key={server.name}
              className="flex flex-col gap-1.5 p-2.5 rounded-md bg-panel-border/20 border border-panel-border"
            >
              {/* 1. 점 + 이름 (한 줄) */}
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                <span className="text-[11px] font-mono font-semibold text-gray-100">
                  {server.name}
                </span>
              </div>

              {/* 2. 상태 텍스트 (그 아래 줄) */}
              <span className={`text-[9px] font-bold ${style.text}`}>
                {server.status.toUpperCase()}
              </span>

              {/* 3. 지역 + 가동시간 */}
              <span className="text-[9px] text-gray-500">
                {server.region} · {server.uptime}
              </span>

              {/* 4. 기존 MiniBar 그대로 */}
              <MiniBar label="CPU" value={server.cpu} colorClass="bg-accent" />
              <MiniBar label="RAM" value={server.ram} colorClass="bg-info" />
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
