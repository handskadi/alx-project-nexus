export default function Footer() {
    return (
        <footer className="mt-16 border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">MK</span>
                            <span className="text-lg font-bold">MK E‑Shop</span>
                        </div>
                        <p className="text-sm text-gray-600">
                            Modern e‑commerce experience built with Next.js + Tailwind. Browse, filter, and shop seamlessly.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-semibold">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#catalog" className="hover:text-gray-900">All Products</a></li>
                            <li><a href="#catalog" className="hover:text-gray-900">Electronics</a></li>
                            <li><a href="#catalog" className="hover:text-gray-900">Fashion</a></li>
                            <li><a href="#catalog" className="hover:text-gray-900">Home & Living</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-semibold">Help</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-gray-900">Shipping</a></li>
                            <li><a href="#" className="hover:text-gray-900">Returns</a></li>
                            <li><a href="#" className="hover:text-gray-900">Support</a></li>
                            <li><a href="#" className="hover:text-gray-900">FAQ</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-semibold">Newsletter</h4>
                        <p className="mb-3 text-sm text-gray-600">Get product updates and exclusive offers.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                            />
                            <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 text-sm text-gray-500 sm:flex-row">
                    <p>© {new Date().getFullYear()} MK E‑Shop. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-gray-900">Privacy</a>
                        <a href="#" className="hover:text-gray-900">Terms</a>
                        <a href="#" className="hover:text-gray-900">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
