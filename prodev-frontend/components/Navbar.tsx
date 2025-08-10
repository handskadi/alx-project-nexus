'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">MK</span>
                    <span className="text-lg font-bold tracking-tight">MK E‑Shop</span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-6 md:flex">
                    <Link href="/" className="text-sm hover:text-emerald-700">Home</Link>
                    <Link href="/#catalog" className="text-sm hover:text-emerald-700">Shop</Link>
                    <Link href="/#deals" className="text-sm hover:text-emerald-700">Deals</Link>
                    <Link href="/#contact" className="text-sm hover:text-emerald-700">Contact</Link>
                    <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black">Sign in</button>
                </nav>

                {/* Mobile toggle */}
                <button
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border md:hidden"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile panel */}
            {open && (
                <div className="border-t border-gray-200 bg-white md:hidden">
                    <nav className="mx-auto max-w-7xl px-4 py-3 space-y-2">
                        <Link href="/" className="block rounded px-3 py-2 hover:bg-gray-50" onClick={() => setOpen(false)}>Home</Link>
                        <Link href="/#catalog" className="block rounded px-3 py-2 hover:bg-gray-50" onClick={() => setOpen(false)}>Shop</Link>
                        <Link href="/#deals" className="block rounded px-3 py-2 hover:bg-gray-50" onClick={() => setOpen(false)}>Deals</Link>
                        <Link href="/#contact" className="block rounded px-3 py-2 hover:bg-gray-50" onClick={() => setOpen(false)}>Contact</Link>
                        <button className="mt-2 w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black">Sign in</button>
                    </nav>
                </div>
            )}
        </header>
    );
}
