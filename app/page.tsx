'use client';
import Link from 'next/link';
import { ArrowRightIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      router.push('/');
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, var(--color-eco-light), var(--color-primary-light))' }}>
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        )}
        <div className="flex flex-col items-center text-center space-y-8">
          <Hero />
          <Features />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard">
              <button 
                style={{ background: 'var(--color-primary)' }}
                className="px-8 py-4 outline-none text-white rounded-xl font-semibold hover:opacity-90 transition-opacity duration-300 shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Proceed To Dashboard</span>
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
