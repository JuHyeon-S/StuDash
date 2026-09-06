import Link from "next/link";
import Panel from "../components/Panel";
import PageHeader from "../components/PageHeader";
import {
  GridIcon,
  ListIcon,
  BellIcon,
  SettingsIcon,
} from "../components/icons";
import type { ComponentType, SVGProps } from "react";

interface NavCard {
  href: string;
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const cards: NavCard[] = [
  {
    href: "/dashboard",
    title: "Dashboard",
    description: "실시간 보안 현황 개요",
    icon: GridIcon,
  },
  {
    href: "/events",
    title: "Events",
    description: "전체 침입 탐지 이벤트 로그",
    icon: ListIcon,
  },
  // {
  //   href: "/alerts",
  //   title: "Alerts",
  //   description: "발생한 경보 확인 및 관리",
  //   icon: BellIcon,
  // },
  // {
  //   href: "/settings",
  //   title: "Settings",
  //   description: "시스템 환경설정",
  //   icon: SettingsIcon,
  // },
];

export default function Home() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <PageHeader
        title="Welcome to StuDash"
        subtitle="보안 관제 시스템에 오신 걸 환영합니다"
      />

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link key={card.href} href={card.href}>
            <Panel className="flex flex-col gap-3 h-full hover:border-accent/50 transition-colors">
              <div className="w-9 h-9 rounded-md bg-accent/10 flex items-center justify-center">
                <card.icon className="w-[18px] h-[18px] text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{card.description}</p>
              </div>
            </Panel>
          </Link>
        ))}
      </div>
    </div>
  );
}
