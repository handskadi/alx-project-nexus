'use client';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/lib/slices/cartSlice';
import { toggleWishlist, selectIsWished } from '@/lib/slices/wishlistSlice';
import type { Product } from '@/lib/productsApi';
import RatingStars from './RatingStars';
import { HeartOutline, HeartSolid } from './icons/HeartIcon';

export default function ProductCard({ product }: { product: Product }) {
    const dispatch = useDispatch();
    const isWished = useSelector(selectIsWished(product.id));

    const {
        title,
        price,
        category,
        image,
        rating = 4.6,
        reviewsCount = 120,
        badge,
    } = product;

    return (
        <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg">
            {/* Image area */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    priority={false}
                />

                {/* Badge */}
                {badge && (
                    <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-amber-500/90 px-2.5 py-1 text-xs font-semibold text-white shadow">
                        {badge}
                    </span>
                )}

                {/* Wishlist toggle */}
                <button
                    type="button"
                    aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
                    onClick={() => dispatch(toggleWishlist(product))}
                    className="absolute right-3 top-3 rounded-full border border-white/30 bg-white/90 p-2 backdrop-blur transition hover:bg-white"
                >
                    {isWished ? (
                        <HeartSolid className="h-4 w-4 text-rose-600" />
                    ) : (
                        <HeartOutline className="h-4 w-4 text-gray-800" />
                    )}
                </button>
            </div>

            {/* Content */}
            <div className="space-y-2 p-4">
                <div className="text-xs font-medium text-emerald-700">{category}</div>

                <h3 className="min-h-12 text-sm font-semibold text-gray-900">
                    <a className="focus:outline-none focus:ring-2 focus:ring-emerald-500/40" href="#">
                        <span className="line-clamp-2">{title}</span>
                    </a>
                </h3>

                <div className="flex items-center gap-2">
                    <RatingStars value={rating} />
                    <span className="text-xs text-gray-500">({reviewsCount})</span>
                </div>

                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900">£{price.toFixed(2)}</span>
                </div>

                <div className="pt-1">
                    <button
                        type="button"
                        onClick={() => dispatch(addToCart({ ...product, qty: 1 }))}
                        className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-black"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </article>
    );
}
