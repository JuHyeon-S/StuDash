"use client";
import Panel from "./Panel";
import {
  ResponsiveContainer,
  LineChart,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Legend,
  Area,
} from "recharts";

export default function ThreatActivityChart() {
  const data = [
    { hour: "00", detected: 38, blocked: 35 },
    { hour: "02", detected: 29, blocked: 27 },
    { hour: "04", detected: 24, blocked: 22 },
    { hour: "06", detected: 31, blocked: 29 },
    { hour: "08", detected: 52, blocked: 48 },
    { hour: "10", detected: 68, blocked: 63 },
    { hour: "12", detected: 74, blocked: 69 },
    { hour: "14", detected: 81, blocked: 76 },
    { hour: "16", detected: 95, blocked: 89 },
    { hour: "18", detected: 88, blocked: 82 },
    { hour: "20", detected: 71, blocked: 66 },
    { hour: "22", detected: 58, blocked: 54 },
  ];
  return (
    <Panel className="flex flex-col justify-start gap-5 h-65">
      <div className="flex justify-between">
        <div className="text-white">THREAT ACTIVITY — LAST 24H</div>
        <div className="flex gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-danger inline-block" />
            Detected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-safe inline-block" />
            Blocked
          </span>
        </div>
      </div>
      <div className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="detectedFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f87171" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="blockedFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="oklch(24% 0.02 250)" vertical={false} />
            <XAxis
              dataKey="hour"
              stroke="oklch(48% 0.02 250)" // 축 선 색
              tick={{ fill: "oklch(58% 0.02 250)", fontSize: 11 }} // 눈금 글자 색/크기
              tickLine={false} // 눈금 작대기 없애기
              axisLine={false} // 축 선 자체 없애기 (더 깔끔)
            />
            <YAxis hide /> {/* 아예 y축 숫자를 안 보여주고 싶으면 */}
            <Area
              type="monotone"
              dataKey="detected"
              stroke="#f87171"
              strokeWidth={2}
              fill="url(#detectedFill)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="blocked"
              stroke="#4ade80"
              strokeWidth={2}
              fill="url(#blockedFill)"
              dot={false}
            />
            <Tooltip
              contentStyle={{
                background: "oklch(20% 0.02 250)",
                border: "1px solid oklch(28% 0.02 250)",
                borderRadius: 8,
              }}
              labelStyle={{ color: "oklch(80% 0.01 250)" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
