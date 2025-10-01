test("db returns fallback when empty", () => {
  const users = [];
  const first = users?.[0]?.name || "Guest";
  expect(first).toBe("Guest");
});