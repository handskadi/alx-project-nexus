import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  rating?: number; // 0–5
  reviewsCount?: number; // count
  badge?: "Best Seller" | "Limited" | "New" | "Popular";
};

export type ProductsQuery = {
  page?: number;
  limit?: number;
  sort?: "price_asc" | "price_desc";
  category?: string;
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      { items: Product[]; total: number },
      ProductsQuery | void
    >({
      query: (q) => {
        const params = new URLSearchParams();
        if (q?.page) params.set("page", String(q.page));
        if (q?.limit) params.set("limit", String(q.limit));
        if (q?.sort) params.set("sort", q.sort);
        if (q?.category) params.set("category", q.category);
        return `products?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
