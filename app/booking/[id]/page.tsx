'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface BookingFormData {
  duration: number;
  startTime: string;
  totalPrice: number;
}

interface BookingResponse {
  success: boolean;
  data: {
    bike: string;
    user: string;
    status: string;
    _id: string;
    startTime: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function BookingPage() {
  const params = useParams();
  const [bikeInfo, setBikeInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [bookingData, setBookingData] = useState<BookingFormData>({
    duration: 1,
    startTime: new Date().toISOString().slice(0, 16),
    totalPrice: 10, // Base price
  });

  useEffect(() => {
    const fetchBikeInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/qr/${params.id}`);
        if (!response.ok) throw new Error('Bike not found');
        const data = await response.json();
        setBikeInfo(data.data);
      } catch (err) {
        console.error('Failed to fetch bike information');
      } finally {
        setLoading(false);
      }
    };

    fetchBikeInfo();
  }, [params.id]);

  const calculatePrice = (hours: number) => {
    const basePrice = 10;
    const hourlyRate = 5;
    return basePrice + (hourlyRate * (hours - 1));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hours = parseInt(e.target.value);
    setBookingData({
      ...bookingData,
      duration: hours,
      totalPrice: calculatePrice(hours)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Calculate end time based on duration
      const start = new Date(bookingData.startTime);
      const end = new Date(start.getTime() + bookingData.duration * 60 * 60 * 1000);

      const bookingPayload = {
        bikeUuid: bikeInfo.uuid,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        bikeId: bikeInfo._id
      };

      const response = await fetch('http://localhost:5000/api/bookings/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(bookingPayload)
      });

      const result: BookingResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.data?.toString() || 'Failed to create booking');
      }

      if (result.success) {
        // Update bike status to booked
        const updateResponse = await fetch(`http://localhost:5000/api/admin/edit-bike/${bikeInfo.uuid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ status: 'booked' })
        });

        if (!updateResponse.ok) {
          console.error('Failed to update bike status');
        }

        // Redirect to booking confirmation
        window.location.href = '/bookings/success';
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-light to-primary-light">
      <div className="container mx-auto px-4 py-8">
        <Link href={`/bike/${params.id}`} className="inline-flex items-center text-primary-dark mb-8">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Bike Details
        </Link>

        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-primary-dark">Book Your Ride</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            )}
            <div>
              <label className="block text-gray-700 mb-2">Rental Duration</label>
              <select
                value={bookingData.duration}
                onChange={handleDurationChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark"
              >
                {[1, 2, 3, 4, 6, 8, 12, 24].map((hours) => (
                  <option key={hours} value={hours}>
                    {hours} {hours === 1 ? 'hour' : 'hours'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Start Time</label>
              <input
                type="datetime-local"
                value={bookingData.startTime}
                onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Price Summary</h3>
              <div className="flex justify-between items-center">
                <span>Total Price:</span>
                <span className="text-xl font-bold">${bookingData.totalPrice}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Link
                href={`/bike/${params.id}`}
                className="bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors text-center"
              >
                Cancel
              </Link>
              <Link href={`/checkout/`} className="flex items-center justify-center">
              
              <button
                type="submit"
                disabled={submitting}
                className={`bg-primary-dark text-white py-3 px-4 rounded-lg transition-colors ${
                  submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-darker'
                }`}
              >
                {submitting ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              </Link>
            
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
