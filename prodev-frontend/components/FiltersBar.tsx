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
            <select
                value={category ?? 'All'}
                onChange={(e) => dispatch(setCategory(e.target.value === 'All' ? null : e.target.value))}
                className="rounded border bg-white px-3 py-2"
            >
                {categories.map((c) => <option key={c}>{c}</option>)}
            </select>

            <select
                value={sort}
                onChange={(e) => dispatch(setSort(e.target.value as any))}
                className="rounded border bg-white px-3 py-2"
            >
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
            </select>
        </div>
    );
}
