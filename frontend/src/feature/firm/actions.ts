'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const setFirmInCookies = async (
  _prevState: { error: null | string },
  form: FormData
) => {
  const firmId = form.get('firm');
  const target = form.get('target');

  if (!firmId || !target) {
    return { error: 'Please select a firm or target page to continue' };
  }

  const cookieStore = await cookies();
  cookieStore.set('selected_firm_id', String(firmId), {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  redirect(String(target));
};
