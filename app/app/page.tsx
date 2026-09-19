import { supabase } from "@/utils/supabase";

type Character = {
  id: string;
  name: string;
  era: string | null;
  description: string | null;
};

export default async function Home() {
  const { data, error } = await supabase
    .from("characters")
    .select("id, name, era, description");

  if (error) {
    return (
      <main className="p-8">
        <h1 className="mb-4 text-2xl font-bold">역사 인물</h1>
        <p className="text-red-600">
          데이터를 불러오지 못했습니다: {error.message}
        </p>
      </main>
    );
  }

  const characters: Character[] = data;

  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold">역사 인물</h1>
      <ul>
        {characters.map((character) => (
          <li key={character.id} className="mb-2">
            <strong>{character.name}</strong> — {character.era} ·{" "}
            {character.description}
          </li>
        ))}
      </ul>
    </main>
  );
}
