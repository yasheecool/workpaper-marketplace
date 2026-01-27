'use client';

import { useActionState } from 'react';
import { signInDemoUser } from '../actions';

const TryDemoButton = ({ styles }: { styles: string }) => {
  const [state, formAction, isPending] = useActionState(signInDemoUser, {
    success: false,
    message: '',
  });

  return (
    <div>
      <form action={formAction} className='w-full'>
        <button type='submit' disabled={isPending} className={styles}>
          {isPending && <span className='loading loading-xs' />}
          Try Demo
        </button>
      </form>
    </div>
  );
};

export default TryDemoButton;
