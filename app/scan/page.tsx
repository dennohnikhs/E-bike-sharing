'use client';

import { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
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
}

export default function ScanPage() {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [bikeInfo, setBikeInfo] = useState<BikeInfo | null>(null);
  const [error, setError] = useState<string>('');

  const fetchBikeInfo = async (uuid: string) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/admin/qr/${uuid}`);
      if (!response.ok) throw new Error('Bike not found');
      const data = await response.json();
      setBikeInfo(data);
    } catch (err) {
      setError('Failed to fetch bike information');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!bikeInfo) return;
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/edit-bike/${bikeInfo.uuid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'in-use',
          isAvailable: false,
        }),
      });
      
      if (!response.ok) throw new Error('Booking failed');
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Booking failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-reader");
    
    html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      (decodedText) => {
        setResult(decodedText);
        html5QrCode.stop();
        fetchBikeInfo(decodedText);
      },
      (error) => {
        console.error(error);
      }
    )
    .catch((err) => console.error(err));

    return () => {
      html5QrCode.stop().catch(err => console.error(err));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-light to-primary-light">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-primary-dark mb-8">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-display font-bold text-primary-dark mb-6">
            Scan Bike QR Code
          </h2>
          
          {!result && (
            <div id="qr-reader" className="aspect-square overflow-hidden rounded-lg mb-4" />
          )}
          
          {isLoading && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">Loading bike information...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 rounded-lg mb-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}
          
          {bikeInfo && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-bold text-green-800">Bike Found!</h3>
                <p className="text-green-700">Bike ID: {bikeInfo.uuid}</p>
                <p className="text-green-700">GPS Module: {bikeInfo.gpsModuleId}</p>
                <p className="text-green-700">Battery: {bikeInfo.batteryLevel}%</p>
                <p className="text-green-700">Status: {bikeInfo.status}</p>
                <p className="text-green-700">Last Updated: {new Date(bikeInfo.lastUpdated).toLocaleString()}</p>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handleBooking}
                  disabled={isLoading || !bikeInfo.isAvailable}
                  className="flex-1 bg-primary-dark text-white py-2 px-4 rounded-lg hover:bg-primary-darker disabled:opacity-50"
                >
                  {bikeInfo.isAvailable ? 'Proceed with Booking' : 'Bike Not Available'}
                </button>
                <Link
                  href="/"
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-center hover:bg-gray-300"
                >
                  Cancel
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
