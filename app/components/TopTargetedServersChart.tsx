import Panel from "./Panel";

const data = [
  { name: "web-01.prod", count: 342 },
  { name: "api-03.prod", count: 298 },
  { name: "db-02.prod", count: 211 },
  { name: "auth-04.prod", count: 156 },
  { name: "cache-05.prod", count: 89 },
];

const max = Math.max(...data.map((d) => d.count));

export default function TopTargetedServersChart() {
  return (
    <Panel className="flex flex-col gap-3 h-65">
      <div className="text-white">TOP TARGETED SERVERS</div>
      <div className="flex-1 flex flex-col justify-evenly">
        {data.map((d) => (
          <div key={d.name} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11.5px] text-gray-300">
                {d.name}
              </span>
              <span className="font-mono text-[11.5px] text-gray-500">
                {d.count}
              </span>
            </div>
            <div className="w-full h-[9px] rounded-full bg-panel-border overflow-hidden">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${(d.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
