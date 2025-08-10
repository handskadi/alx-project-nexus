// components/ProductCardSkeleton.tsx
export default function ProductCardSkeleton() {
    return (
        <div className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="aspect-[4/3] bg-gray-100" />
            <div className="space-y-3 p-4">
                <div className="h-3 w-24 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-3/5 rounded bg-gray-200" />
                <div className="h-6 w-24 rounded bg-gray-200" />
            </div>
        </div>
    );
}
