export function HeartOutline({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12.1 8.64l.9.92.9-.92a4 4 0 015.66 5.66l-6.56 6.56a1 1 0 01-1.42 0L5.02 14.3A4 4 0 0110.68 8.64z" />
        </svg>
    );
}

export function HeartSolid({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
            <path d="M12 21s-6.716-4.353-9.2-7.6C.8 11.2 2 7.5 5.6 6.6 8 6 9.9 7.4 12 9.5 14.1 7.4 16 6 18.4 6.6 22 7.5 23.2 11.2 21.2 13.4 18.716 16.647 12 21 12 21z" />
        </svg>
    );
}
