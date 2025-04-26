'use client';
import Link from 'next/link';
import { ArrowRightIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  userId: string;
  name: string;  // Add name field
  role: string;
  iat: number;
  exp: number;
}

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<{ name: string; id: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      try {
        const decodedToken = jwtDecode<TokenPayload>(token);
        setUserData({
          name: decodedToken.name || 'User',
          id: decodedToken.userId || 'Unknown'
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
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

  const handleDashboardClick = () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      console.log('User Token:', token);
      try {
        const decodedToken = jwtDecode<TokenPayload>(token);
        console.log('Decoded Token:', decodedToken);
        console.log('User ID:', decodedToken.userId || 'ID not available');
        console.log('User Name:', decodedToken.name || 'Name not available');
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, var(--color-eco-light), var(--color-primary-light))' }}>
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        {isAuthenticated && (
          <>
            <button
              onClick={handleLogout}
              className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
        <div className="flex flex-col items-center text-center space-y-8">
          <Hero />
          <Features />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" onClick={handleDashboardClick}>
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
