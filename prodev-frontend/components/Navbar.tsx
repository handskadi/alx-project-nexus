'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartCount } from '@/lib/slices/cartSlice';
import { selectWishlistCount } from '@/lib/slices/wishlistSlice';
import CartModal from './CartModal';
import WishlistModal from './WishlistModal';
import CheckoutModal from './CheckoutModal';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openWish, setOpenWish] = useState(false);
    const [openCheckout, setOpenCheckout] = useState(false);

    const cartCount = useSelector(selectCartCount);
    const wishCount = useSelector(selectWishlistCount);

    return (
        <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">MK</span>
                    <span className="text-lg font-bold tracking-tight">MK E-Shop</span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-6 md:flex">
                    <Link href="/" className="text-sm hover:text-emerald-700">Home</Link>
                    <Link href="/#catalog" className="text-sm hover:text-emerald-700">Shop</Link>
                    <Link href="/#deals" className="text-sm hover:text-emerald-700">Deals</Link>
                    <Link href="/#contact" className="text-sm hover:text-emerald-700">Contact</Link>

                    {/* Wishlist */}
                    <button
                        onClick={() => setOpenWish(true)}
                        className="relative rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                        aria-label="Open wishlist"
                    >
                        <span className="mr-2">Wishlist</span>
                        <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-600 px-1 text-xs font-bold text-white">
                            {wishCount}
                        </span>
                    </button>

                    {/* Cart */}
                    <button
                        onClick={() => setOpenCart(true)}
                        className="relative rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                        aria-label="Open cart"
                    >
                        <span className="mr-2">Cart</span>
                        <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-emerald-600 px-1 text-xs font-bold text-white">
                            {cartCount}
                        </span>
                    </button>
                </nav>

                {/* Mobile controls */}
                <div className="flex items-center gap-2 md:hidden">
                    <button className="relative rounded-md border px-3 py-2" onClick={() => setOpenWish(true)} aria-label="Open wishlist">
                        WL
                        {wishCount > 0 && (
                            <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-600 px-1 text-xs font-bold text-white">
                                {wishCount}
                            </span>
                        )}
                    </button>
                    <button className="relative rounded-md border px-3 py-2" onClick={() => setOpenCart(true)} aria-label="Open cart">
                        Cart
                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-emerald-600 px-1 text-xs font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <button
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile panel */}
            {mobileOpen && (
                <div className="border-t border-gray-200 bg-white md:hidden">
                    <nav className="mx-auto max-w-7xl space-y-2 px-4 py-3">
                        <Link href="/" className="block rounded px-3 py-2 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Home</Link>
                        <Link href="/#catalog" className="block rounded px-3 py-2 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Shop</Link>
                        <Link href="/#deals" className="block rounded px-3 py-2 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Deals</Link>
                        <Link href="/#contact" className="block rounded px-3 py-2 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Contact</Link>
                    </nav>
                </div>
            )}

            {/* Modals */}
            <WishlistModal open={openWish} onClose={() => setOpenWish(false)} />
            <CartModal
                open={openCart}
                onClose={() => setOpenCart(false)}
                onCheckout={() => setOpenCheckout(true)}
            />
            <CheckoutModal open={openCheckout} onClose={() => setOpenCheckout(false)} />
        </header>
    );
}
