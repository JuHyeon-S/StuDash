"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Panel from "../components/Panel";

export default function LoginPage() {
  const [userId, setUserId] = useState("user@email.com"); // 임시 ID 추후 수정
  const [password, setPassword] = useState("userpassword"); // 임시 PW 추후 수정
  const [error, setError] = useState("");

  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!userId || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    if (!userId.includes("@")) {
      setError("올바른 형식이 아닙니다.");
      return;
    }

    setError("");
    // 현재 로그인 연결 X 입력조건만 맞으면 이동함
    document.cookie = "studash_auth=1; path=/; max-age=86400";
    router.push("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[oklch(11.5%_0.02_250)]">
      <Panel className="flex flex-col gap-5 w-80 p-6">
        <div className="text-center">
          <h1 className="text-xl font-bold text-white">StuDash</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="login-email" className="sr-only">
              이메일
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="E-mail"
              autoComplete="email"
              onChange={(e) => {
                e.preventDefault();
                setUserId(e.target.value);
              }}
              className="bg-panel-border/30 border border-panel-border rounded-md px-3 py-2 text-sm text-white outline-none focus:border-accent"
              value={userId} // 임시 ID 추후 수정
            ></input>
            <label htmlFor="login-password" className="sr-only">
              비밀번호
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
              className="bg-panel-border/30 border border-panel-border rounded-md px-3 py-2 text-sm text-white outline-none focus:border-accent"
              value={password} // 임시 PW 추후 수정
            ></input>
            {error && (
              <p role="alert" className="text-xs text-danger">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="bg-accent text-[oklch(13%_0.02_250)] font-semibold text-sm rounded-md py-2 mt-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              로그인
            </button>
          </form>
        </div>
      </Panel>
    </div>
  );
}
