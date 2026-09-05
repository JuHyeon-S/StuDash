import StatCard from "./StatCard";
import {
  ShieldAlertIcon,
  ShieldCheckIcon,
  ServerIcon,
  ClockIcon,
} from "./icons";

const stats = [
  {
    title: "Total Threats",
    value: "1,284",
    icon: ShieldAlertIcon,
    tone: "danger" as const,
    delta: "+12.4%",
    deltaTone: "bad" as const,
  },
  {
    title: "Blocked Attacks",
    value: "1,193",
    icon: ShieldCheckIcon,
    tone: "safe" as const,
    delta: "92.9%",
    deltaTone: "good" as const,
  },
  {
    title: "Active Servers",
    value: "42",
    icon: ServerIcon,
    tone: "info" as const,
    delta: "3 degraded",
    deltaTone: "neutral" as const,
  },
  {
    title: "Avg Response Time",
    value: "184 ms",
    icon: ClockIcon,
    tone: "accent" as const,
    delta: "-8ms",
    deltaTone: "good" as const,
  },
];

export default function StatRow() {
  return (
    <div className="flex gap-4 w-full">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
