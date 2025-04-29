'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface BikeInfo {
  _id: string;
  uuid: string;
  gpsModuleId: string;
  isAvailable: boolean;
  status: string;
  batteryLevel: number;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function BikeDetailsPage() {
  const params = useParams();
  const [bikeInfo, setBikeInfo] = useState<BikeInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBikeInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/qr/${params.id}`);
        if (!response.ok) throw new Error('Bike not found');
        const data = await response.json();
        setBikeInfo(data.data);
      } catch (err) {
        setError('Failed to fetch bike information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBikeInfo();
  }, [params.id]);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error || !bikeInfo) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-light to-primary-light">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-primary-dark mb-8">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-primary-dark">Bike Details</h1>
          
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold text-primary-dark mb-4">Basic Information</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600">Bike ID:</span>
                    <p className="font-semibold">{bikeInfo.uuid}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">GPS Module:</span>
                    <p className="font-semibold">{bikeInfo.gpsModuleId}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-primary-dark mb-4">Status</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600">Battery Level:</span>
                    <p className="font-semibold">{bikeInfo.batteryLevel}%</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Availability:</span>
                    <p className={`font-semibold ${bikeInfo.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                      {bikeInfo.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-primary-dark mb-4">Timestamps</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Created:</span>
                  <p className="font-semibold">{new Date(bikeInfo.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Last Updated:</span>
                  <p className="font-semibold">{new Date(bikeInfo.lastUpdated).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setBikeInfo(null)}
                  className="bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors text-center"
                >
                  Cancel
                </button>
                <Link
                  href={`/booking/${bikeInfo.uuid}`}
                  className="bg-primary-dark text-white py-3 px-4 rounded-lg hover:bg-primary-darker transition-colors text-center"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
