import type { ComponentType, SVGProps } from "react";
import Panel from "./Panel";

type Tone = "danger" | "safe" | "info" | "accent";
type DeltaTone = "good" | "bad" | "neutral";

const TONE_STYLES: Record<Tone, string> = {
  danger: "bg-danger/10 text-danger",
  safe: "bg-safe/10 text-safe",
  info: "bg-info/10 text-info",
  accent: "bg-accent/10 text-accent",
};

const DELTA_STYLES: Record<DeltaTone, string> = {
  good: "text-safe",
  bad: "text-danger",
  neutral: "text-warning",
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  tone,
  delta,
  deltaTone = "neutral",
}: {
  title: string;
  value: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone: Tone;
  delta?: string;
  deltaTone?: DeltaTone;
}) {
  return (
    <Panel className="flex-1 flex items-center justify-start gap-5">
      <div className={`p-3 rounded-md ${TONE_STYLES[tone]}`}>
        <Icon className="w-[18px] h-[18px]" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-sm text-gray-400">{title}</h2>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold text-white">{value}</p>
          {delta && (
            <span className={`text-xs font-semibold ${DELTA_STYLES[deltaTone]}`}>
              {delta}
            </span>
          )}
        </div>
      </div>
    </Panel>
  );
}
