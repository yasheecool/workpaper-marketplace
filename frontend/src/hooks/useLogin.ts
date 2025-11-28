import { useRouter } from 'next/navigation';
import { user2, user1, user3 } from '@/utils/JWT-Users';
import useAppStore from '@/store/appStore';
import { useEffect } from 'react';

const USER = user1;

const useMockLogin = () => {
  const router = useRouter();
  const { setToken, resetAuth } = useAppStore();

  useEffect(() => {
    resetAuth();
  }, []);

  const login = () => {
    setToken(USER);

    if (USER.marketplace.isAdmin) return router.push('/admin');
    router.push('/firm-selection');
  };

  return { login };
};
export default useMockLogin;
