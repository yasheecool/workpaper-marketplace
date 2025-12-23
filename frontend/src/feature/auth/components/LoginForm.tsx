'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/browserClient';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const supabase = await createClient();

      const { data, error: err } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: 'http://localhost:3000',
        },
      });

      if (err) throw err;
      toast.success('Magic link sent to your email!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unexpected error occurred');
      toast.error(error || 'Failed to send magic link.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
};

export default LoginForm;
