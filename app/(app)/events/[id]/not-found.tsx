import Link from "next/link";
import Panel from "@/app/components/Panel";

export default function EventNotFound() {
  return (
    <div className="p-6 flex items-center justify-center h-full">
      <Panel className="flex flex-col items-center gap-3 p-8 text-center max-w-sm">
        <div className="text-lg font-bold text-white">
          이벤트를 찾을 수 없습니다
        </div>
        <p className="text-xs text-gray-500">
          요청하신 이벤트 ID가 존재하지 않거나 삭제되었습니다.
        </p>
        <Link
          href="/events"
          className="text-xs font-semibold text-accent hover:underline mt-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          이벤트 로그로 돌아가기
        </Link>
      </Panel>
    </div>
  );
}
