'use client';

import Hero from '@/components/Hero';
import ValueProps from '@/components/ValueProps';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useGetProductsQuery } from '@/lib/productsApi';
import { setPage } from '@/lib/slices/catalogSlice';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import FiltersBar from '@/components/FiltersBar';

export default function HomePage() {
  const dispatch = useDispatch();
  const { page, limit, sort, category } = useSelector((s: RootState) => s.catalog);
  const { data, isLoading, isError, isFetching } = useGetProductsQuery({ page, limit, sort, category: category ?? undefined });
  const items = data?.items ?? [];

  return (
    <>
      <Hero />
      <ValueProps />

      <section id="catalog" className="mx-auto mt-12 max-w-7xl">
        <div className="mb-2 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-sm text-gray-600">Hand‑picked items you’ll love</p>
          </div>
        </div>

        <FiltersBar />

        {isError && <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">Failed to load products.</p>}

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: limit }).map((_, i) => <ProductCardSkeleton key={i} />)
            : items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm disabled:opacity-50"
            disabled={page === 1 || isFetching}
            onClick={() => dispatch(setPage(page - 1))}
          >
            ← Prev
          </button>
          <span className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700">Page {page}</span>
          <button
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm disabled:opacity-50"
            disabled={items.length < limit || isFetching}
            onClick={() => dispatch(setPage(page + 1))}
          >
            Next →
          </button>
        </div>
      </section>

      {/* Deals + Contact anchors for the navbar links (optional simple placeholders) */}
      <section id="deals" className="mx-auto mt-16 max-w-7xl rounded-2xl border border-gray-200 bg-white p-6 text-center">
        <h3 className="text-lg font-semibold">Today’s Deals</h3>
        <p className="text-sm text-gray-600">Check back soon for exclusive offers.</p>
      </section>

      <section id="contact" className="mx-auto mt-10 max-w-7xl rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold">Contact us</h3>
        <p className="mt-1 text-sm text-gray-600">Email: support@mke-shop.example</p>
      </section>
    </>
  );
}
