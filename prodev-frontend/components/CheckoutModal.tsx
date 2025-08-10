'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartCount, selectCartTotal } from '@/lib/slices/cartSlice';
import Image from 'next/image';

type Props = {
    open: boolean;
    onClose: () => void;
};

type FormState = {
    email: string;
    fullName: string;
    address: string;
    city: string;
    postcode: string;
    payment: 'card' | 'cod';
    notes: string;
};

const initialForm: FormState = {
    email: '',
    fullName: '',
    address: '',
    city: '',
    postcode: '',
    payment: 'card',
    notes: '',
};

export default function CheckoutModal({ open, onClose }: Props) {
    const items = useSelector(selectCartItems);
    const count = useSelector(selectCartCount);
    const total = useSelector(selectCartTotal);
    const list = Object.values(items);

    const [form, setForm] = useState<FormState>(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    // ESC to close
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    // Lock scroll
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, [open]);

    useEffect(() => {
        if (open) {
            setSubmitted(false);
            closeBtnRef.current?.focus();
        }
    }, [open]);

    const update = (k: keyof FormState, v: string) => setForm((s) => ({ ...s, [k]: v }));

    const valid =
        form.email.includes('@') &&
        form.fullName.trim().length >= 3 &&
        form.address.trim().length >= 5 &&
        form.city.trim().length >= 2 &&
        form.postcode.trim().length >= 3 &&
        list.length > 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        if (!valid) return;
        // Here you would call your backend checkout API
        // For demo we simply show a success state
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[70] bg-black/40 transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={onClose}
            />
            {/* Panel */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Checkout"
                className={`fixed inset-0 z-[71] grid place-items-center p-4 transition ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            >
                <div
                    className={`relative w-full max-w-3xl transform rounded-2xl bg-white shadow-2xl transition-all ${open ? 'scale-100' : 'scale-95'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b p-4">
                        <h3 className="text-lg font-semibold">Checkout ({count} items)</h3>
                        <button
                            ref={closeBtnRef}
                            onClick={onClose}
                            className="inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                        >
                            Close
                        </button>
                    </div>

                    {/* Content */}
                    <div className="grid gap-6 p-4 md:grid-cols-2">
                        {/* Order summary */}
                        <div className="rounded-2xl border p-4">
                            <h4 className="mb-3 text-sm font-semibold">Order Summary</h4>
                            <ul className="space-y-3">
                                {list.map((it) => (
                                    <li key={it.id} className="flex items-center gap-3">
                                        <Image
                                            src={it.image}
                                            alt={it.title}
                                            width={56} // matches h-14 (14 * 4px = 56px)
                                            height={56} // matches w-14
                                            className="rounded border object-contain"
                                            style={{ height: '56px', width: '56px' }} // ensures Tailwind size match
                                        />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm">{it.title}</p>
                                            <p className="text-xs text-gray-600">Qty {it.qty} · £{it.price.toFixed(2)}</p>
                                        </div>
                                        <div className="text-sm font-medium">
                                            £{(it.price * it.qty).toFixed(2)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 border-t pt-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">£{total.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold">£0.00</span>
                                </div>
                                <div className="mt-2 flex items-center justify-between text-base">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-bold">£{total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Checkout form */}
                        <form className="rounded-2xl border p-4" onSubmit={handleSubmit}>
                            <h4 className="mb-3 text-sm font-semibold">Billing & Delivery</h4>

                            <label className="mb-2 block text-xs font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => update('email', e.target.value)}
                                className="mb-3 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                                placeholder="you@example.com"
                            />

                            <label className="mb-2 block text-xs font-medium text-gray-600">Full Name</label>
                            <input
                                value={form.fullName}
                                onChange={(e) => update('fullName', e.target.value)}
                                className="mb-3 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                                placeholder="John Doe"
                            />

                            <label className="mb-2 block text-xs font-medium text-gray-600">Address</label>
                            <input
                                value={form.address}
                                onChange={(e) => update('address', e.target.value)}
                                className="mb-3 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                                placeholder="123 Main Street"
                            />

                            <div className="mb-3 grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-2 block text-xs font-medium text-gray-600">City</label>
                                    <input
                                        value={form.city}
                                        onChange={(e) => update('city', e.target.value)}
                                        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                                        placeholder="London"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-xs font-medium text-gray-600">Postcode</label>
                                    <input
                                        value={form.postcode}
                                        onChange={(e) => update('postcode', e.target.value)}
                                        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                                        placeholder="SW1A 1AA"
                                    />
                                </div>
                            </div>

                            <fieldset className="mb-3">
                                <legend className="mb-2 block text-xs font-medium text-gray-600">Payment Method</legend>
                                <div className="flex gap-3">
                                    <label className="inline-flex items-center gap-2 text-sm">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={form.payment === 'card'}
                                            onChange={() => update('payment', 'card')}
                                        />
                                        Card
                                    </label>
                                    <label className="inline-flex items-center gap-2 text-sm">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={form.payment === 'cod'}
                                            onChange={() => update('payment', 'cod')}
                                        />
                                        Cash on Delivery
                                    </label>
                                </div>
                            </fieldset>

                            <label className="mb-2 block text-xs font-medium text-gray-600">Notes (optional)</label>
                            <textarea
                                value={form.notes}
                                onChange={(e) => update('notes', e.target.value)}
                                className="mb-4 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                                placeholder="Delivery notes, special instructions…"
                                rows={3}
                            />

                            {submitted && !valid && (
                                <p className="mb-3 text-sm text-red-600">Please complete all required fields.</p>
                            )}

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                                disabled={!valid}
                            >
                                Confirm Order
                            </button>

                            {submitted && valid && (
                                <p className="mt-3 text-center text-sm text-emerald-700">
                                    ✅ Order confirmed (demo). Implement real payment to complete checkout.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
