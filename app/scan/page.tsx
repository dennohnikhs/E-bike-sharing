'use client';

import { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function ScanPage() {
  const [result, setResult] = useState<string>('');

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
          
          <div id="qr-reader" className="aspect-square overflow-hidden rounded-lg mb-4" />
          
          {result && (
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-green-800">Bike code detected: {result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
