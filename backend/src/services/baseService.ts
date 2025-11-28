import prisma from '../config/dbClient';
import { AppError } from '../errors/AppError';
import { VendorRequest } from '@prisma/client';

export const createVendorRequest = async (
  requestForm: Partial<VendorRequest>,
  userId: string,
  firmId: string
) => {
  try {
    const requestRecord = await prisma.vendorRequest.create({
      data: {
        ...(requestForm as VendorRequest),
        requestedByUserId: userId,
        requestingFirmId: firmId,
      },
    });
    return requestRecord;
  } catch (error) {
    throw new AppError('DATABASE ERROR', 500);
  }
};
