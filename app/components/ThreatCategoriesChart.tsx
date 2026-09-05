"use client";
import Panel from "./Panel";
import { ResponsiveContainer, PieChart, Pie, Sector, Tooltip } from "recharts";

export default function ThreatCategoriesChart() {
  const data = [
    { label: "Malware", value: 34, fill: "#f87171" },
    { label: "Phishing", value: 26, fill: "#fb923c" },
    { label: "Brute Force", value: 20, fill: "#facc15" },
    { label: "DDoS", value: 14, fill: "#38bdf8" },
    { label: "Other", value: 6, fill: "#6b7280" },
  ];
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return (
    <Panel className="flex flex-col justify-start gap-5 h-65">
      <div className="text-white">THREAT CATEGORIES</div>
      <div className="flex gap-4">
        <div className="relative w-1/2 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                innerRadius="65%"
                outerRadius="100%"
                paddingAngle={2}
                shape={(props) => (
                  <Sector {...props} fill={props.fill} stroke="none" />
                )}
              />
              <Tooltip
                position={{ y: 0 }}
                contentStyle={{
                  background: "oklch(20% 0.02 250)",
                  border: "1px solid oklch(28% 0.02 250)",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "oklch(80% 0.01 250)" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold text-white">{total}</span>
            <span className="text-[10px] text-gray-500">events</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-xs text-gray-400 justify-center">
          {data.map((d) => (
            <div key={d.label} className="flex justify-between w-40">
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-sm inline-block"
                  style={{ backgroundColor: d.fill }}
                />
                {d.label}
              </span>
              <span>{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
