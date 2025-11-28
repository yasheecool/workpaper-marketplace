import workpapersApi from '../sdk/workpapersApi';

export const getWorkpapersContent = async (firmId: string) => {
  const response = await workpapersApi.getContent(firmId);
  return { totalItems: response.length, data: response };
};

export const subscribeToWorkpapersContent = async (
  firmId: string,
  userId: string,
  listingId: string
) => {
  const subscriptionResponse = await workpapersApi.subscribeToContent(
    firmId,
    userId,
    listingId
  );

  if (subscriptionResponse.success) {
    return { success: true, message: subscriptionResponse.message };
  }
};
