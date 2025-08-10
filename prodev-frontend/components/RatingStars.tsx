// components/RatingStars.tsx
export default function RatingStars({ value = 0 }: { value: number }) {
    const full = Math.floor(value);
    const half = value - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    const Star = ({ filled = false }: { filled?: boolean }) => (
        <svg viewBox="0 0 24 24" className={`h-4 w-4 ${filled ? 'text-amber-500' : 'text-gray-300'}`} fill="currentColor">
            <path d="M12 17.3l-5.5 3.2 1.5-6.1-4.7-4.1 6.2-.5L12 4l2.5 5.8 6.2.5-4.7 4.1 1.5 6.1z" />
        </svg>
    );

    const HalfStar = () => (
        <div className="relative h-4 w-4">
            <svg viewBox="0 0 24 24" className="absolute inset-0 h-4 w-4 text-gray-300" fill="currentColor">
                <path d="M12 17.3l-5.5 3.2 1.5-6.1-4.7-4.1 6.2-.5L12 4l2.5 5.8 6.2.5-4.7 4.1 1.5 6.1z" />
            </svg>
            <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-amber-500" fill="currentColor">
                    <path d="M12 17.3l-5.5 3.2 1.5-6.1-4.7-4.1 6.2-.5L12 4l2.5 5.8 6.2.5-4.7 4.1 1.5 6.1z" />
                </svg>
            </div>
        </div>
    );

    return (
        <div className="flex items-center">
            {Array.from({ length: full }).map((_, i) => <Star key={`f-${i}`} filled />)}
            {half && <HalfStar />}
            {Array.from({ length: empty }).map((_, i) => <Star key={`e-${i}`} />)}
            <span className="ml-1 text-xs font-medium text-gray-700">{value.toFixed(1)}</span>
        </div>
    );
}
