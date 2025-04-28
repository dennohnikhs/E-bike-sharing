'use client';

import { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { ArrowLeftIcon, QrCodeIcon } from '@heroicons/react/24/outline';
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

export default function ScanPage() {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [bikeInfo, setBikeInfo] = useState<BikeInfo | null>(null);
  const [error, setError] = useState<string>('');
  const [showScanner, setShowScanner] = useState(false);

  const fetchBikeInfo = async (uuid: string) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/admin/qr/${uuid}`);
      if (!response.ok) throw new Error('Bike not found');
      const data = await response.json();
      window.location.href = `/bike/${uuid}`;
    } catch (err) {
      setError('Failed to fetch bike information');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!showScanner) return;

    const html5QrCode = new Html5Qrcode("qr-reader");
    let lastError = ''; // Track last error to prevent duplicate logs
    let errorCount = 0; // Track consecutive errors

    html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      async (decodedText) => {
        try {
          console.log('Scanned UUID:', decodedText);
          const scannedData = JSON.parse(decodedText);
          const bikeUuid = scannedData.bikeUuid;
          
          setResult(bikeUuid);
          html5QrCode.stop();
          setShowScanner(false);
          await fetchBikeInfo(bikeUuid);
        } catch (err) {
          setError('Invalid QR code format');
          console.error('Failed to parse QR code:', err);
        }
      },
      (errorMessage: string) => {
        // Only log error if it's different from the last one and not too frequent
        if (errorMessage !== lastError && errorCount < 3) {
          console.debug('QR Scanner:', errorMessage);
          lastError = errorMessage;
          errorCount++;
        }
      }
    )
    .catch((err: Error) => {
      setError('Failed to start QR scanner');
      console.error('Scanner initialization error:', err);
    });

    return () => {
      html5QrCode.stop().catch(err => console.error('Scanner cleanup error:', err));
    };
  }, [showScanner]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-light to-primary-light">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-primary-dark mb-8">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="flex justify-center items-center w-full h-screen mx-auto">
          <div className="w-[500px] mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg ">
            <h2 className="text-2xl font-display font-bold text-primary-dark mb-6">
              Scan Bike QR Code
            </h2>

            {!result && !showScanner && (
              <button
                onClick={() => setShowScanner(true)}
                className="w-full bg-primary-dark text-white py-3 px-4 rounded-lg hover:bg-primary-darker flex items-center justify-center gap-2 mb-4"
              >
                <QrCodeIcon className="w-full h-full" />
                Open QR Scanner
              </button>
            )}

            {showScanner && (
              <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-auto my-auto transform -translate-y-1/2 top-1/2 relative">
                  <h3 className="text-xl font-bold mb-4 text-center">Scan QR Code</h3>
                  <div id="qr-reader" className="aspect-square overflow-hidden rounded-lg mb-4 max-w-[300px] mx-auto" />
                  <button
                    onClick={() => setShowScanner(false)}
                    className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
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
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                  <h3 className="text-2xl font-bold mb-4 text-primary-dark">Bike Details</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bike ID:</span>
                      <span className="font-semibold">{bikeInfo.uuid}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Battery Level:</span>
                      <span className="font-semibold">{bikeInfo.batteryLevel}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-semibold capitalize ${
                        bikeInfo.isAvailable ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {bikeInfo.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">GPS Module:</span>
                      <span className="font-semibold">{bikeInfo.gpsModuleId}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-semibold">{new Date(bikeInfo.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-semibold">{new Date(bikeInfo.lastUpdated).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setBikeInfo(null);
                        setResult('');
                      }}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <Link
                      href={`/booking/${bikeInfo.uuid}`}
                      className="flex-1 bg-primary-dark text-white py-3 px-4 rounded-lg hover:bg-primary-darker transition-colors text-center"
                    >
                      Proceed to Booking
                    </Link>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
