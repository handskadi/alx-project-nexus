export default function ValueProps() {
    const items = [
        { title: 'Fast Delivery', desc: 'Free next‑day on selected items', icon: Truck() },
        { title: 'Secure Payments', desc: 'Encrypted checkout & buyer protection', icon: Shield() },
        { title: 'Easy Returns', desc: '30‑day hassle‑free returns', icon: Refresh() },
    ];

    return (
        <section className="mx-auto mt-10 grid max-w-7xl gap-4 sm:grid-cols-3">
            {items.map((it) => (
                <div key={it.title} className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">{it.icon}</div>
                    <div>
                        <h3 className="text-sm font-semibold">{it.title}</h3>
                        <p className="text-sm text-gray-600">{it.desc}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}

/* inline SVGs */
function Truck() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
            <circle cx="7.5" cy="18" r="1.5" />
            <circle cx="17.5" cy="18" r="1.5" />
        </svg>
    );
}
function Shield() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}
function Refresh() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 12a8 8 0 10-3 6.3" />
            <path d="M20 12v5h-5" />
        </svg>
    );
}
