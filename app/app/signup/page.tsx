"use client";

import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`오류: ${error.message}`);
      return;
    }

    setMessage("가입 완료. 로그인 페이지로 이동합니다.");
    setTimeout(() => router.push("/login"), 1000);
  };

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="mb-4 text-2xl font-bold">회원가입</h1>
      <form onSubmit={handleSignUp} className="space-y-4">
        <input
          type="email"
          placeholder="이메일"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded border p-2"
        />
        <input
          type="password"
          placeholder="비밀번호 (6자 이상)"
          required
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded border p-2"
        />
        <button
          type="submit"
          className="w-full rounded bg-black px-4 py-2 text-white"
        >
          가입하기
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
      <p className="mt-4 text-sm">
        이미 계정이 있나요?{" "}
        <Link href="/login" className="underline">
          로그인
        </Link>
      </p>
    </main>
  );
}
