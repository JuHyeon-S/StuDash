"use client";
import { useState, useEffect } from "react";

function getDate(): { time: string; date: string } {
  const now: Date = new Date();
  const day: number = now.getDate();
  const month: number = now.getMonth() + 1;
  const year: number = now.getFullYear();
  const dayOfWeek: number = now.getDay();
  const hours: number = now.getHours();
  const minutes: number = now.getMinutes();
  const seconds: number = now.getSeconds();
  return {
    time: `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
    date: `${year}.${month.toString().padStart(2, "0")}.${day.toString().padStart(2, "0")}.${["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][dayOfWeek]}`,
  };
}

export default function Topbar() {
  const [date, setDate] = useState(getDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(getDate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between text-white p-4 pr-6 pl-6 border-b border-gray-700">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-accent flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              width={13}
              height={13}
              fill="none"
              stroke="oklch(13% 0.02 250)"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4z" />
            </svg>
          </span>
          <div className="text-2xl font-bold">StuDash</div>
        </div>
        <span className="text-gray-400">|</span>
        <div className="text-lg text-gray-400">Overview</div>
      </div>
      <div className="flex items-center gap-6">
        <div className="liveCheck text-white px-3 py-1 rounded-full flex items-center space-x-2">
          <span className="dot"></span>
          <span>Live</span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold" suppressHydrationWarning>
            {date.time}
          </div>
          <div className="text-sm text-gray-400" suppressHydrationWarning>
            {date.date}
          </div>
        </div>
        <span className="w-px h-6 bg-gray-700" />
        <span className="text-[11px] font-mono text-gray-500">
          NODE&nbsp;SOC-EAST-01
        </span>
      </div>
    </div>
  );
}
