import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Panel from "@/app/components/Panel";
import PageHeader from "@/app/components/PageHeader";
import { ArrowLeftIcon } from "@/app/components/icons";
import {
  getEventById,
  SEVERITY_STYLES,
  SEVERITY_LABELS,
} from "@/app/lib/events";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = getEventById(id);
  return {
    title: event ? `${event.type} · StuDash` : "이벤트를 찾을 수 없음 · StuDash",
  };
}

// 상호작용이 없는 정보 표시 페이지라 별도 "use client" 없이 서버 컴포넌트로 유지
export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) notFound();

  const fields: { label: string; value: string }[] = [
    { label: "이벤트 ID", value: event.id },
    { label: "발생 시각", value: event.time },
    { label: "출처 IP", value: `${event.ip} (${event.country})` },
    { label: "대상 서버", value: event.target },
    { label: "프로토콜 / 포트", value: `${event.protocol} / ${event.port}` },
    { label: "조치", value: event.action },
    { label: "탐지 신뢰도", value: `${event.confidence}%` },
  ];

  return (
    <div className="p-6 flex flex-col gap-4">
      <Link
        href="/events"
        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white w-fit rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
      >
        <ArrowLeftIcon aria-hidden="true" className="w-[14px] h-[14px]" />
        이벤트 로그로 돌아가기
      </Link>

      <PageHeader
        title={event.type}
        subtitle={event.id}
        right={
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded ${SEVERITY_STYLES[event.severity]}`}
          >
            {SEVERITY_LABELS[event.severity]}
          </span>
        }
      />

      <Panel className="flex flex-col gap-4 max-w-2xl">
        <p className="text-sm text-gray-300 leading-relaxed">
          {event.description}
        </p>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-4">
          {fields.map((f) => (
            <div key={f.label} className="flex flex-col gap-0.5">
              <dt className="text-[10px] font-semibold text-gray-500 tracking-wide">
                {f.label}
              </dt>
              <dd className="text-sm text-gray-200 font-mono">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Panel>
    </div>
  );
}
