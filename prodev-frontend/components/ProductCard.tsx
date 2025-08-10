import { Product } from '@/lib/productsApi';
import Image from 'next/image';

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="rounded-lg border bg-white p-4 shadow-sm hover:shadow">
            <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={200}
                className="object-contain"
            />
            <h3 className="mt-3 line-clamp-2 font-medium">{product.title}</h3>
            <div className="mt-2 flex items-center justify-between">
                <span className="text-lg font-semibold">£{product.price.toFixed(2)}</span>
                <span className="text-xs text-gray-500">{product.category}</span>
            </div>
        </div>
    );
}
