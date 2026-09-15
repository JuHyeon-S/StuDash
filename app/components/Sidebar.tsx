"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import { GridIcon, ListIcon } from "./icons";

interface NavItem {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const items: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: GridIcon },
  { href: "/events", label: "Events", icon: ListIcon },
  // { href: "/alerts", label: "Alerts", icon: BellIcon },
  // { href: "/settings", label: "Settings", icon: SettingsIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="주요 메뉴"
      className="w-54 shrink-0 border-r border-panel-border p-3 flex flex-col gap-0.5"
    >
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
              active
                ? "bg-accent/10 border-l-2 border-accent text-accent font-semibold"
                : "text-gray-400 hover:bg-panel-border/30"
            }`}
          >
            <item.icon aria-hidden="true" className="w-[17px] h-[17px]" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
