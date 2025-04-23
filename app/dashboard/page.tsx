import { ClockIcon, BoltIcon, MapIcon, ChartBarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Dashboard() {
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
            My E-Bike Dashboard
          </h1>
          <p className="text-gray-600">Welcome back! Here's your riding overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {['Total Rides', 'Distance', 'CO₂ Saved', 'Active Rentals'].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">{stat}</h3>
                <div className="rounded-full p-2" style={{ background: 'var(--color-eco-light)' }}>
                  <ChartBarIcon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                </div>
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-primary-dark)' }}>
                {index === 0 ? '24' : index === 1 ? '156 km' : index === 2 ? '45 kg' : '1'}
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
