'use client';
import { useState } from 'react';
import { FaCreditCard, FaPaypal, FaMobile } from 'react-icons/fa';

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState<string>('');

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add payment processing logic here
    console.log('Processing payment with:', selectedPayment);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Payment Options */}
            {/* <button
              className={`p-4 border rounded-lg flex flex-col items-center ${
                selectedPayment === 'mpesa' ? 'border-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelectedPayment('mpesa')}
            >
              <FaMobile className="text-3xl mb-2" />
              <span>M-Pesa</span>
            </button> */}

            <button
              className={`p-4 border rounded-lg flex flex-col items-center ${
                selectedPayment === 'paypal' ? 'border-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelectedPayment('paypal')}
            >
              <FaPaypal className="text-3xl mb-2" />
              <span>PayPal</span>
            </button>

            <button
              className={`p-4 border rounded-lg flex flex-col items-center ${
                selectedPayment === 'card' ? 'border-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelectedPayment('card')}
            >
              <FaCreditCard className="text-3xl mb-2" />
              <span>Credit Card</span>
            </button>
          </div>

          {/* Payment Forms */}
          {selectedPayment === 'mpesa' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded"
                  placeholder="254700000000"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Pay with M-Pesa
              </button>
            </form>
          )}

          {selectedPayment === 'paypal' && (
            <div className="text-center">
              <button
                className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                onClick={handlePaymentSubmit}
              >
                Continue with PayPal
              </button>
            </div>
          )}

          {selectedPayment === 'card' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Card Number</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Expiry Date</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">CVV</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Pay with Card
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
