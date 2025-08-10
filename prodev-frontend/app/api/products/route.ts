import { NextRequest } from "next/server";

const MOCK = Array.from({ length: 120 }).map((_, i) => ({
  id: String(i + 1),
  title: `Sample Product ${i + 1}`,
  price: Number((Math.random() * 200 + 10).toFixed(2)),
  category: ["Electronics", "Fashion", "Home", "Sports"][i % 4],
  image: "https://via.placeholder.com/300x200?text=Product",
}));

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "12");
  const sort = searchParams.get("sort") as "price_asc" | "price_desc" | null;
  const category = searchParams.get("category");

  let list = [...MOCK];
  if (category) list = list.filter((p) => p.category === category);
  if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") list.sort((a, b) => b.price - a.price);

  const start = (page - 1) * limit;
  const items = list.slice(start, start + limit);

  return Response.json({ items, total: list.length });
}
