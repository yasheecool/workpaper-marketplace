import { useQuery } from '@tanstack/react-query';
import api from '@/app/utils/axiosInstance';

const getUser = (id: string | undefined) => {
  if (!id) return Promise.reject('no id provided');
  return api.get(`/user/${id}`);
};

const getFirm = (id: string | undefined) => {
  if (!id) return Promise.reject('no id provided');
  return api.get(`/firm/${id}`);
};

export const useUser = (id: string | undefined) => {
  const { data, status, error } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => getUser(id),
    enabled: !!id,
  });

  return { data, error };
};

export const useFirm = (id: string | undefined) => {
  const { data, status, error } = useQuery({
    queryKey: ['firm', id],
    queryFn: async () => getFirm(id),
    enabled: !!id,
  });

  return { data, error };
};
