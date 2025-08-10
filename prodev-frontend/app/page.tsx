// app/page.tsx (replace grid/render bits)
'use client';
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
    <main>
      <h1 className="mb-2 text-2xl font-bold tracking-tight">Product Catalog</h1>
      <p className="mb-6 text-sm text-gray-600">Browse curated picks with fast filters and smooth pagination.</p>
      <FiltersBar />

      {isError && <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">Failed to load products.</p>}

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: limit }).map((_, i) => <ProductCardSkeleton key={i} />)
          : items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      {/* Pagination */}
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
    </main>
  );
}
