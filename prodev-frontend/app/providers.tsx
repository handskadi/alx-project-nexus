import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'MK E‑Shop',
    description: 'Premium e‑commerce catalog built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-gray-50 text-gray-900">
                <Providers>
                    <Navbar />
                    <main className="mx-auto max-w-7xl px-4">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
