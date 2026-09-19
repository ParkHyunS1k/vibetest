import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("로그인 사용자에게 로그아웃 동작을 제공한다", async () => {
  const source = await readFile(
    new URL("../app/page.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /supabase\.auth\.signOut\(\)/);
  assert.match(source, />\s*로그아웃\s*</);
});
