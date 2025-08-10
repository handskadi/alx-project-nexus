'use client';

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCartItems,
    selectCartCount,
    selectCartTotal,
    removeFromCart,
    setQuantity,
    clearCart,
} from '@/lib/slices/cartSlice';

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function CartModal({ open, onClose }: Props) {
    const dispatch = useDispatch();
    const items = useSelector(selectCartItems);
    const count = useSelector(selectCartCount);
    const total = useSelector(selectCartTotal);
    const list = Object.values(items);
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    // Close on ESC
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    // Lock scroll when open
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    // Focus close button when opened (basic focus management)
    useEffect(() => {
        if (open) closeBtnRef.current?.focus();
    }, [open]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[60] bg-black/40 transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal panel */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Shopping cart"
                className={`fixed inset-0 z-[61] grid place-items-center p-4 transition ${open ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
            >
                <div
                    className={`relative w-full max-w-2xl transform rounded-2xl bg-white shadow-2xl transition-all ${open ? 'scale-100' : 'scale-95'
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b p-4">
                        <h3 className="text-lg font-semibold">Your Cart ({count})</h3>
                        <button
                            ref={closeBtnRef}
                            onClick={onClose}
                            className="inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                        >
                            Close
                        </button>
                    </div>

                    {/* Content */}
                    <div className="max-h-[60vh] overflow-auto p-4">
                        {list.length === 0 ? (
                            <p className="text-sm text-gray-600">Your cart is empty.</p>
                        ) : (
                            <ul className="space-y-4">
                                {list.map((it) => (
                                    <li key={it.id} className="flex gap-3">
                                        <img
                                            src={it.image}
                                            alt={it.title}
                                            className="h-20 w-20 rounded border object-contain"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">{it.title}</p>
                                            <p className="text-sm text-gray-600">£{it.price.toFixed(2)}</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <label className="text-xs text-gray-500" htmlFor={`qty-${it.id}`}>
                                                    Qty
                                                </label>
                                                <input
                                                    id={`qty-${it.id}`}
                                                    type="number"
                                                    min={1}
                                                    value={it.qty}
                                                    onChange={(e) =>
                                                        dispatch(setQuantity({ id: it.id, qty: Number(e.target.value) || 1 }))
                                                    }
                                                    className="w-20 rounded border px-2 py-1 text-sm"
                                                />
                                                <button
                                                    className="text-sm text-red-600 hover:underline"
                                                    onClick={() => dispatch(removeFromCart({ id: it.id }))}
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

                    {/* Footer */}
                    <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center justify-between sm:justify-start sm:gap-6">
                            <span className="text-sm text-gray-600">Subtotal</span>
                            <span className="text-base font-semibold">£{total.toFixed(2)}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                                onClick={() => dispatch(clearCart())}
                                disabled={list.length === 0}
                            >
                                Clear
                            </button>
                            <button
                                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                                disabled={list.length === 0}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
