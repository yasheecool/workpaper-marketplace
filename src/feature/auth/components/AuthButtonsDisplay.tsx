'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { signInDemoUser } from '../actions';

export function AuthButtonsDisplay() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signInDemoUser, {
    success: false,
    message: '',
  });

  // Guard: Only show toast once per component mount
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!state.message || hasShownToast.current) return;

    hasShownToast.current = true;

    if (state.success) {
      toast.success(state.message);
      router.push('/firm-selection');
    } else {
      toast.error(state.message);
    }
  }, [state.message, state.success, router]);

  // Cleanup: Reset flag on unmount
  useEffect(() => {
    return () => {
      hasShownToast.current = false;
    };
  }, []);

  return (
    <>
      <Link href='/login'>
        <button className='btn bg-none text-primary border-primary'>
          Log In
        </button>
      </Link>

      <form action={formAction}>
        <button
          type='submit'
          disabled={isPending}
          className='btn btn-primary ease-in-out'
        >
          {isPending && <span className='loading loading-xs' />}
          Try Demo
        </button>
      </form>
    </>
  );
}
