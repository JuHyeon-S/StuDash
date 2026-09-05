import type { ReactNode } from "react";

export default function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-panel border border-panel-border rounded-lg p-3 ${className}`}
    >
      {children}
    </div>
  );
}
