// components/FiltersBar.tsx
'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setCategory, setSort } from '@/lib/slices/catalogSlice';

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports'];

export default function FiltersBar() {
    const dispatch = useDispatch();
    const { category, sort } = useSelector((s: RootState) => s.catalog);

    return (
        <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
                <label className="px-2 text-xs font-semibold text-gray-500">Category</label>
                <select
                    value={category ?? 'All'}
                    onChange={(e) => dispatch(setCategory(e.target.value === 'All' ? null : e.target.value))}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                >
                    {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
                <label className="px-2 text-xs font-semibold text-gray-500">Sort</label>
                <select
                    value={sort}
                    onChange={(e) => dispatch(setSort(e.target.value as any))}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                >
                    <option value="price_asc">Price: Low → High</option>
                    <option value="price_desc">Price: High → Low</option>
                </select>
            </div>
        </div>
    );
}
