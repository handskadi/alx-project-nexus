import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative mx-auto mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-500 px-6 py-16 text-white">
            <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Discover premium products at MK E‑Shop
                </h1>
                <p className="mt-3 text-white/90">
                    Curated selection, smart filters, lightning‑fast browsing. Built with Next.js, TypeScript, and Tailwind.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <Link href="#catalog" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow hover:bg-gray-50">
                        Shop Now
                    </Link>
                    <Link href="#deals" className="rounded-lg border border-white/70 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
                        View Deals
                    </Link>
                </div>
            </div>

            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        </section>
    );
}
