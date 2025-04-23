'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        
        const isAdmin = email.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase() && 
        password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
        console.log('isAdmin:', isAdmin); // Debugging line
        console.log('Admin password:', process.env.NEXT_PUBLIC_ADMIN_PASSWORD);
        console.log('Admin email:', process.env.NEXT_PUBLIC_ADMIN_EMAIL);
        if (isAdmin) {
            router.push('/admin/dashboard');
          } 
      // Make API call to backend for authentication
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Handle authentication failure
      if (response.status === 401) {
        setError('Invalid email or password');
        return;
      }

      if (response.status === 404) {
        setError('User not found');
        return;
      }

      if (!response.ok) {
        setError(data.message || 'Authentication failed');
        return;
      }

      // Verify we received the expected data
      if (!data.token || !data.user) {
        setError('Invalid server response');
        return;
      }

        // Store authentication data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({
          ...data.user,
          isAdmin // Add admin status to stored user data
        }));
      
      // Redirect based on user role
      if (isAdmin) {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    } catch (err) {
      setError('Server connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, var(--color-eco-light), var(--color-primary-light))' }}>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            style={{ background: 'var(--color-primary)' }}
            className="w-full py-2 text-white rounded-lg hover:opacity-90"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
