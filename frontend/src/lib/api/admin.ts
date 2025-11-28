import api from '@/lib/axiosInstance';

export const getVendorRequests = async () => {
  const response = await api.get('/admin/vendor-requests');
  return response.data;
};

export const updateVendorRequest = async ({
  requestId,
  action,
}: {
  requestId: string;
  action: 'approved' | 'rejected';
}) => {
  const response = await api.patch(`/admin/vendor-requests/${requestId}`, {
    action,
  });
  return response;
};
