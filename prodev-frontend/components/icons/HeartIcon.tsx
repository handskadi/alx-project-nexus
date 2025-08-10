// components/icons/HeartIcon.tsx
export function HeartIcon({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M12 21s-6.716-4.353-9.2-7.6C.8 11.2 2 7.5 5.6 6.6 8 6 9.9 7.4 12 9.5 14.1 7.4 16 6 18.4 6.6 22 7.5 23.2 11.2 21.2 13.4 18.716 16.647 12 21 12 21z" />
        </svg>
    );
}
