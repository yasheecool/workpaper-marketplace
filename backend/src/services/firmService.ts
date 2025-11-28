import prisma from '../config/dbClient';
import { AppError } from '../errors/AppError';
import { VendorProfile } from '@prisma/client';

export const getFirmById = async (firmId: string) => {
  const firm = await prisma.firm.findUnique({
    where: { firmId: firmId },
    include: {
      vendorRequest: {
        select: {
          requestStatus: true, // Include vendor request status as well, this is useful for cases where a firm has requested to be a vendor, avoiding an extra request to the backend
        },
      },
    },
  });

  if (!firm) {
    throw new AppError('Firm not found', 404);
  }

  return firm;
};

export const getFirmCreatedListings = async (firmId: string) => {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        ownerFirmId: firmId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        name: true,
        contentType: true,
        updatedAt: true,
        visibility: true,
        id: true,
        status: true,
        updatedBy: {
          select: {
            firstName: true,
            lastName: true,
            profileImage: true,
          },
        },
      },
    });
    return listings;
  } catch (error) {
    throw new AppError('Database Error', 500);
  }
};

export const getVendorProfileByFirmId = async (firmId: string) => {
  try {
    const vendorProfile = await prisma.vendorProfile.findUnique({
      where: {
        firmId: firmId,
      },
      include: {
        vendor: {
          select: { firmName: true },
        },
      },
    });

    if (!vendorProfile) {
      throw new AppError(`Vendor profile for ${firmId} does not exist`, 404);
    }

    return vendorProfile;
  } catch (error) {
    throw new AppError('Database Error', 500);
  }
};

export const updateVendorProfile = async (
  firmId: string,
  updatedFields: Partial<VendorProfile>
) => {
  try {
    const existingProfile = await prisma.vendorProfile.findUnique({
      where: { firmId: firmId },
    });

    if (!existingProfile) {
      throw new AppError(`Vendor profile for ${firmId} does not exist`, 404);
    }
    const updatedProfile = await prisma.vendorProfile.update({
      where: { firmId: firmId },
      data: { ...updatedFields },
    });
    return updatedProfile;
  } catch (error) {
    throw new AppError('Database Error', 500);
  }
};
