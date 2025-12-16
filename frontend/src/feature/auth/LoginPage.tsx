'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/browserClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function signInWithEmail() {
    setIsLoading(true);

    const supabase = createClient();
    const { data, error: err } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: 'http://localhost:3000/marketplace',
      },
    });

    if (err) {
      setError(err.message);
    } else {
      setError(null);
    }
    setIsLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signInWithEmail();
  };

  return (
    <main className='min-h-[calc(100vh-70px)] flex items-center justify-center'>
      <div className='w-full max-w-md px-6 border-[0.5px] p-8 rounded-lg shadow-lg border-primary-500'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='text-center'>
            <h2 className='text-2xl font-semibold text-grey-900'>
              Sign in to your account
            </h2>
          </div>

          <div>
            <label
              htmlFor='email'
              className='label text-sm font-medium text-gray-700 mb-2'
            >
              Email address
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='input input-primary w-full'
              placeholder='Enter your email'
            />
          </div>

          <button
            type='submit'
            className='btn btn-primary w-full text-white'
            disabled={isLoading}
          >
            Send magic link
          </button>
        </form>
      </div>
    </main>
  );
};
export default Login;
