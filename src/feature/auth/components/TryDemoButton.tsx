'use client';

import { useActionState } from 'react';
import { signInDemoUser } from '../actions';

const TryDemoButton = ({ styles }: { styles: string }) => {
  const [state, formAction, isPending] = useActionState(signInDemoUser, {
    success: false,
    message: '',
  });

  return (
    <form action={formAction}>
      <button type='submit' disabled={isPending} className={styles}>
        {isPending && <span className='loading loading-xs' />}
        Try Demo
      </button>
    </form>
  );
};

export default TryDemoButton;
