"use client";

import { supabase } from "@/utils/supabase";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

type Character = {
  id: string;
  name: string;
  era: string | null;
  description: string | null;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      const [userResult, charactersResult] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from("characters").select("id, name, era, description"),
      ]);

      if (!active) return;

      setUser(userResult.data.user);

      if (charactersResult.error) {
        setMessage(`데이터를 불러오지 못했습니다: ${charactersResult.error.message}`);
      } else {
        setCharacters(charactersResult.data);
      }

      setLoading(false);
    };

    void loadData();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="mx-auto max-w-2xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">역사 인물</h1>
        {user ? (
          <span className="text-sm text-gray-600">{user.email}</span>
        ) : (
          <Link href="/login" className="text-sm underline">
            로그인
          </Link>
        )}
      </div>

      {loading ? (
        <p>불러오는 중...</p>
      ) : message ? (
        <p className="text-red-600">{message}</p>
      ) : characters.length > 0 ? (
        <ul className="space-y-3">
          {characters.map((character) => (
            <li key={character.id} className="rounded border p-4">
              <strong className="text-lg">{character.name}</strong>
              <span className="ml-2 text-gray-500">{character.era}</span>
              <p className="mt-1 text-sm">{character.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>인물이 없습니다.</p>
      )}
    </main>
  );
}
