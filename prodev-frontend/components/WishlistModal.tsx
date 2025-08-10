'use client';

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectWishlistMap,
    selectWishlistCount,
    removeFromWishlist,
    clearWishlist,
} from '@/lib/slices/wishlistSlice';
import { addToCart } from '@/lib/slices/cartSlice';

export default function WishlistModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const dispatch = useDispatch();
    const map = useSelector(selectWishlistMap);
    const count = useSelector(selectWishlistCount);
    const list = Object.values(map);
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    // ESC close
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    // Body lock
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, [open]);

    // Focus
    useEffect(() => {
        if (open) closeBtnRef.current?.focus();
    }, [open]);

    const moveToCart = (id: string) => {
        const it = map[id];
        if (!it) return;
        dispatch(addToCart({ ...it, category: '', rating: 5, reviewsCount: 0, badge: undefined, qty: 1 } as any));
        dispatch(removeFromWishlist({ id }));
    };

    return (
        <>
            <div
                className={`fixed inset-0 z-[60] bg-black/40 transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={onClose}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Wishlist"
                className={`fixed inset-0 z-[61] grid place-items-center p-4 transition ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            >
                <div
                    className={`relative w-full max-w-2xl transform rounded-2xl bg-white shadow-2xl transition-all ${open ? 'scale-100' : 'scale-95'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between border-b p-4">
                        <h3 className="text-lg font-semibold">Wishlist ({count})</h3>
                        <button
                            ref={closeBtnRef}
                            onClick={onClose}
                            className="inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                        >
                            Close
                        </button>
                    </div>

                    <div className="max-h-[60vh] overflow-auto p-4">
                        {list.length === 0 ? (
                            <p className="text-sm text-gray-600">Your wishlist is empty.</p>
                        ) : (
                            <ul className="space-y-4">
                                {list.map((it) => (
                                    <li key={it.id} className="flex gap-3">
                                        <img src={it.image} alt={it.title} className="h-20 w-20 rounded border object-contain" />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">{it.title}</p>
                                            <p className="text-sm text-gray-600">£{it.price.toFixed(2)}</p>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                <button
                                                    className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-black"
                                                    onClick={() => moveToCart(it.id)}
                                                >
                                                    Move to Cart
                                                </button>
                                                <button
                                                    className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                                                    onClick={() => dispatch(removeFromWishlist({ id: it.id }))}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="flex items-center justify-between border-t p-4">
                        <span className="text-sm text-gray-600">You can add items to cart or keep them saved for later.</span>
                        <button
                            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
                            onClick={() => dispatch(clearWishlist())}
                            disabled={list.length === 0}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
