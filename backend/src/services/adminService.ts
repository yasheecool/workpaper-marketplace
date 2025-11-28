import prisma from '../config/dbClient';
import { AppError } from '../errors/AppError';
import { RequestStatus } from '@prisma/client';

export const getVendorRequestsFromDb = async () => {
  try {
    const vendorRequests = await prisma.vendorRequest.findMany({
      include: {
        requestedByFirm: {
          select: {
            firmName: true,
          },
        },
        requestedByUser: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        actionedByUser: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return vendorRequests;
  } catch (error) {
    throw new AppError('Database Error', 500);
  }
};

export const updateVendorRequest = async (
  requestId: string,
  action: string,
  actionedByUser: string
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { userId: actionedByUser },
      select: { isAdmin: true },
    });

    if (!user) {
      throw new AppError('Unauthorized', 403);
    }

    const request = await prisma.vendorRequest.update({
      where: { requestId: requestId },
      data: {
        requestStatus: action as RequestStatus,
        actionedAt: new Date(),
        actionedBy: actionedByUser,
      },
    });

    return request;
  } catch (error) {
    throw new AppError('Error updating vendor request', 500);
  }
};
