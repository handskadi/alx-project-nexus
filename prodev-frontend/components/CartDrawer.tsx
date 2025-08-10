'use client';

import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartCount, selectCartTotal, removeFromCart, setQuantity, clearCart } from '@/lib/slices/cartSlice';

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
    const dispatch = useDispatch();
    const items = useSelector(selectCartItems);
    const count = useSelector(selectCartCount);
    const total = useSelector(selectCartTotal);
    const list = Object.values(items);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-50 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={onClose}
            />
            {/* Panel */}
            <aside
                className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'
                    }`}
                aria-hidden={!open}
            >
                <div className="flex items-center justify-between border-b p-4">
                    <h3 className="text-lg font-semibold">Your Cart ({count})</h3>
                    <button className="text-sm text-gray-600 hover:text-gray-900" onClick={onClose}>Close</button>
                </div>

                <div className="flex h-[calc(100%-140px)] flex-col">
                    <div className="flex-1 overflow-auto p-4">
                        {list.length === 0 ? (
                            <p className="text-sm text-gray-600">Your cart is empty.</p>
                        ) : (
                            <ul className="space-y-4">
                                {list.map((it) => (
                                    <li key={it.id} className="flex gap-3">
                                        <img src={it.image} alt={it.title} className="h-16 w-16 rounded border object-contain" />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">{it.title}</p>
                                            <p className="text-sm text-gray-600">£{it.price.toFixed(2)}</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    min={1}
                                                    value={it.qty}
                                                    onChange={(e) => dispatch(setQuantity({ id: it.id, qty: Number(e.target.value) || 1 }))}
                                                    className="w-16 rounded border px-2 py-1 text-sm"
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

                    <div className="border-t p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-sm text-gray-600">Subtotal</span>
                            <span className="text-base font-semibold">£{total.toFixed(2)}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="flex-1 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                                onClick={() => dispatch(clearCart())}
                                disabled={list.length === 0}
                            >
                                Clear
                            </button>
                            <button
                                className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                                disabled={list.length === 0}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
