// 대시보드, 이벤트 로그에서 사용하는 데이터

export type Severity = "critical" | "warning" | "info";

export interface LogEntry {
  id: string;
  time: string;
  ip: string;
  country: string;
  type: string;
  target: string;
  action: string;
  severity: Severity;
  protocol: string;
  port: number;
  confidence: number; // 탐지 신뢰도(%)
  description: string;
}

export const SEVERITY_STYLES: Record<Severity, string> = {
  critical: "bg-danger/15 text-danger",
  warning: "bg-warning/15 text-warning",
  info: "bg-info/15 text-info",
};

export const SEVERITY_LABELS: Record<Severity, string> = {
  critical: "Critical",
  warning: "Warning",
  info: "Info",
};

const IPS: { ip: string; country: string }[] = [
  { ip: "185.220.101.47", country: "러시아" },
  { ip: "103.45.12.9", country: "중국" },
  { ip: "45.155.204.88", country: "네덜란드" },
  { ip: "192.168.1.104", country: "내부망(사내)" },
  { ip: "91.242.68.3", country: "우크라이나" },
  { ip: "198.51.100.23", country: "브라질" },
  { ip: "203.0.113.77", country: "베트남" },
  { ip: "194.26.29.156", country: "독일" },
  { ip: "45.146.164.110", country: "프랑스" },
  { ip: "89.248.165.74", country: "네덜란드" },
  { ip: "5.188.206.18", country: "러시아" },
  { ip: "141.98.11.87", country: "루마니아" },
  { ip: "172.104.22.9", country: "미국" },
  { ip: "185.147.23.4", country: "튀르키예" },
  { ip: "77.83.36.19", country: "이탈리아" },
  { ip: "92.63.197.12", country: "우크라이나" },
  { ip: "43.129.10.55", country: "홍콩" },
  { ip: "154.213.184.9", country: "나이지리아" },
  { ip: "94.102.61.7", country: "네덜란드" },
  { ip: "45.61.185.20", country: "폴란드" },
];

const EVENT_TYPES: {
  type: string;
  severity: Severity;
  protocol: string;
  port: number;
  description: string;
}[] = [
  {
    type: "SQL Injection Attempt",
    severity: "critical",
    protocol: "HTTPS",
    port: 443,
    description:
      "짧은 시간 내 다수의 SQL 인젝션 페이로드가 반복적으로 탐지되어 요청이 자동 차단되었습니다.",
  },
  {
    type: "Brute Force Login",
    severity: "warning",
    protocol: "HTTPS",
    port: 443,
    description:
      "동일 계정에 대해 짧은 간격으로 다수의 로그인 실패가 발생하여 요청 속도를 제한했습니다.",
  },
  {
    type: "Remote Code Execution",
    severity: "critical",
    protocol: "HTTPS",
    port: 8080,
    description:
      "알려진 취약점을 이용한 원격 코드 실행 시도가 탐지되어 즉시 차단되었습니다.",
  },
  {
    type: "Unusual Login Location",
    severity: "info",
    protocol: "HTTPS",
    port: 443,
    description:
      "평소와 다른 위치에서의 로그인이 감지되어 참고용으로 기록되었습니다.",
  },
  {
    type: "Port Scan Detected",
    severity: "warning",
    protocol: "TCP",
    port: 22,
    description:
      "다수의 포트에 대한 순차적 접속 시도가 감지되어 스캐닝 행위로 판단, 차단되었습니다.",
  },
  {
    type: "DDoS Traffic Spike",
    severity: "critical",
    protocol: "HTTP",
    port: 80,
    description:
      "평소 대비 비정상적으로 높은 트래픽 유입이 감지되어 트래픽 제어 정책이 적용되었습니다.",
  },
  {
    type: "New Device Login",
    severity: "info",
    protocol: "HTTPS",
    port: 443,
    description:
      "등록되지 않은 기기에서의 로그인이 확인되어 본인 인증 절차를 거쳐 정상 처리되었습니다.",
  },
  {
    type: "Malware Signature Match",
    severity: "critical",
    protocol: "HTTPS",
    port: 443,
    description:
      "업로드된 파일에서 알려진 악성코드 시그니처가 탐지되어 격리 조치되었습니다.",
  },
  {
    type: "Suspicious File Upload",
    severity: "warning",
    protocol: "HTTPS",
    port: 443,
    description:
      "허용되지 않은 확장자 또는 비정상적인 크기의 파일 업로드 시도가 감지되었습니다.",
  },
  {
    type: "API Rate Limit Exceeded",
    severity: "info",
    protocol: "HTTPS",
    port: 443,
    description:
      "짧은 시간 내 API 호출 횟수가 임계치를 초과하여 요청이 제한되었습니다.",
  },
  {
    type: "Privilege Escalation Attempt",
    severity: "critical",
    protocol: "SSH",
    port: 22,
    description:
      "일반 권한 계정에서 관리자 권한으로의 비정상적인 전환 시도가 탐지되었습니다.",
  },
  {
    type: "Credential Stuffing",
    severity: "warning",
    protocol: "HTTPS",
    port: 443,
    description:
      "유출된 계정 정보 목록을 이용한 것으로 추정되는 대량 로그인 시도가 감지되었습니다.",
  },
];

const TARGETS = [
  "web-01.prod",
  "web-02.prod",
  "api-03.prod",
  "db-02.prod",
  "auth-04.prod",
  "cache-05.prod",
];

const ACTIONS = [
  "Blocked",
  "Flagged",
  "Rate Limited",
  "Mitigated",
  "Quarantined",
  "Verified",
  "Throttled",
];

const CONFIDENCE_BASE: Record<Severity, number> = {
  critical: 90,
  warning: 68,
  info: 42,
};

function generateEvents(count: number): LogEntry[] {
  const events: LogEntry[] = [];
  let hour = 14,
    minute = 32,
    second = 7;

  for (let i = 0; i < count; i++) {
    const event = EVENT_TYPES[i % EVENT_TYPES.length];
    const { ip, country } = IPS[i % IPS.length];
    const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;

    events.push({
      id: `EVT-${String(i + 1).padStart(4, "0")}`,
      time,
      ip,
      country,
      type: event.type,
      target: TARGETS[i % TARGETS.length],
      action: ACTIONS[i % ACTIONS.length],
      severity: event.severity,
      protocol: event.protocol,
      port: event.port,
      confidence: CONFIDENCE_BASE[event.severity] + ((i * 7) % 10),
      description: event.description,
    });

    second -= 7;
    if (second < 0) {
      second += 60;
      minute -= 1;
    }
    if (minute < 0) {
      minute += 60;
      hour -= 1;
    }
    if (hour < 0) hour += 24;
  }

  return events;
}

export const EVENTS: LogEntry[] = generateEvents(56);

export function getEventById(id: string): LogEntry | undefined {
  return EVENTS.find((e) => e.id === id);
}
