'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useGetProductsQuery } from '@/lib/productsApi';
import { setPage } from '@/lib/slices/catalogSlice';
import ProductCard from '@/components/ProductCard';
import FiltersBar from '@/components/FiltersBar';

export default function HomePage() {
  const dispatch = useDispatch();
  const { page, limit, sort, category } = useSelector((s: RootState) => s.catalog);
  const { data, isLoading, isError } = useGetProductsQuery({ page, limit, sort, category: category ?? undefined });

  return (
    <main>
      <h1 className="mb-4 text-2xl font-bold">Product Catalog</h1>
      <FiltersBar />

      {isLoading && <p>Loading products…</p>}
      {isError && <p className="text-red-600">Failed to load products.</p>}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      {data && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            className="rounded border bg-white px-3 py-2 disabled:opacity-50"
            disabled={page === 1}
            onClick={() => dispatch(setPage(page - 1))}
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">Page {page}</span>
          <button
            className="rounded border bg-white px-3 py-2 disabled:opacity-50"
            disabled={data.items.length < limit}
            onClick={() => dispatch(setPage(page + 1))}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
