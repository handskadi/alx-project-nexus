'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hydrate, selectCartItems } from '@/lib/slices/cartSlice';

const STORAGE_KEY = 'mk_cart_v1';

export default function CartPersistence() {
    const dispatch = useDispatch();
    const items = useSelector(selectCartItems);

    // Load once on mount
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                dispatch(hydrate(parsed));
            }
        } catch { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Save on change
    useEffect(() => {
        try {
            const state = { items };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch { }
    }, [items]);

    return null;
}
