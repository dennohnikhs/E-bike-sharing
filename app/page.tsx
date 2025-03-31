import Link from 'next/link';
import { ArrowRightIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import Hero from '@/components/Hero';
import Features from '@/components/Features';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, var(--color-eco-light), var(--color-primary-light))' }}>
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex flex-col items-center text-center space-y-8">
          <Hero />
          <Features />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard">
              <button 
                style={{ background: 'var(--color-primary)' }}
                className="px-8 py-4 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity duration-300 shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Go to Dashboard</span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </Link>
            
            <Link href="/scan">
              <button 
                style={{ background: 'var(--color-secondary)' }}
                className="px-8 py-4 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity duration-300 shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Scan QR Code</span>
                <QrCodeIcon className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
