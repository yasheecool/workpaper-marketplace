'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const setFirmInCookies = async (form: FormData) => {
  const firmId = form.get('firm');
  const target = form.get('target');

  if (!firmId || !target) {
    throw new Error(
      'Please ensure a firm is selected and target route is provided'
    );
  }

  const cookieStore = await cookies();
  cookieStore.set('selected_firm_id', String(firmId), {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  return redirect(String(target));
};
