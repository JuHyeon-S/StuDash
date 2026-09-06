"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Panel from "../components/Panel";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!userId || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    if (!userId.includes("@")) {
      setError("올바른 이메일 형식이 아니에요.");
      return;
    }

    setError("");
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
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => {
                e.preventDefault();
                setUserId(e.target.value);
              }}
              className="bg-panel-border/30 border border-panel-border rounded-md px-3 py-2 text-sm text-white outline-none focus:border-accent"
            ></input>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
              className="bg-panel-border/30 border border-panel-border rounded-md px-3 py-2 text-sm text-white outline-none focus:border-accent"
            ></input>
            {error && <p className="text-xs text-danger">{error}</p>}
            <button
              type="submit"
              className="bg-accent text-[oklch(13%_0.02_250)] font-semibold text-sm rounded-md py-2 mt-2"
            >
              로그인
            </button>
          </form>
        </div>
      </Panel>
    </div>
  );
}
