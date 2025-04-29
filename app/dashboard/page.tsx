'use client';
import { ClockIcon, BoltIcon, MapIcon, ChartBarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  userId: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

interface BookingStats {
  totalRides: number;
  totalDistance: number;
  co2Saved: number;
  activeRentals: number;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<{ name: string; id: string } | null>(null);
  const [bookingStats, setBookingStats] = useState<BookingStats>({
    totalRides: 0,
    totalDistance: 0,
    co2Saved: 0,
    activeRentals: 0
  });

  const fetchBookingStats = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/bookings/my-bookings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      // Calculate stats from bookings
      const totalRides = data.length;
      const activeRentals = data.filter((booking: any) => booking.status === 'active').length;
      // Assuming each ride saves about 0.2kg of CO2 per km
      const totalDistance = data.reduce((acc: number, booking: any) => acc + (booking.distance || 0), 0);
      const co2Saved = totalDistance * 0.2;

      setBookingStats({
        totalRides,
        totalDistance,
        co2Saved,
        activeRentals
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<TokenPayload>(token);
        setUserData({
          name: decodedToken.name || 'User',
          id: decodedToken.userId || 'Unknown'
        });
        fetchBookingStats(decodedToken.userId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="w-full mb-6">
          <Link href="/">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </Link>
        </div>
        
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold" style={{ color: 'var(--color-earth-dark)' }}>
            Your E-Bike Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {userData?.name}! (ID: {userData?.id})</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Rides', value: bookingStats.totalRides },
            { label: 'Distance', value: `${bookingStats.totalDistance.toFixed(1)} km` },
            { label: 'CO₂ Saved', value: `${bookingStats.co2Saved.toFixed(1)} kg` },
            { label: 'Active Rentals', value: bookingStats.activeRentals }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">{stat.label}</h3>
                <div className="rounded-full p-2" style={{ background: 'var(--color-eco-light)' }}>
                  <ChartBarIcon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                </div>
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-primary-dark)' }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--color-earth-dark)' }}>
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="rounded-full p-3 mr-4" style={{ background: 'var(--color-eco-light)' }}>
                  <BoltIcon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold" style={{ color: 'var(--color-earth-dark)' }}>
                    E-Bike Rental #{1234 + index}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Duration: 45 mins • Distance: 8.5 km • Cost: KES 350
                  </p>
                </div>
                <span className="text-sm text-gray-500">2h ago</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
