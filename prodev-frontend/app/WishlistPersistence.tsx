'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hydrateWishlist, selectWishlistMap } from '@/lib/slices/wishlistSlice';

const KEY = 'mk_wishlist_v1';

export default function WishlistPersistence() {
    const dispatch = useDispatch();
    const items = useSelector(selectWishlistMap);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(KEY);
            if (raw) {
                dispatch(hydrateWishlist(JSON.parse(raw)));
            }
        } catch { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(KEY, JSON.stringify({ items }));
        } catch { }
    }, [items]);

    return null;
}
