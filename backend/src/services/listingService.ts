import prisma from '../config/dbClient';
import { AppError } from '../errors/AppError';
import { Listing, RequestStatus } from '@prisma/client';

// TODO: Refactor this file and split it into smaller files

export const getListingOrThrow = async (listingId: string) => {
  try {
    const listing = await prisma.listing.findUniqueOrThrow({
      where: {
        id: listingId,
      },
    });

    return listing;
  } catch (error) {
    throw new AppError('Database Error', 500);
  }
};

//to populate the main marketplace page
export const getMarketplaceListings = async () => {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        visibility: {
          in: ['public', 'request_access'],
        },
        status: 'active',
      },
      select: {
        id: true,
        name: true,
        contentType: true,
        updatedAt: true,
        description: true,
        imagesLink: true,
        visibility: true,
        workpaperType: true,
        entityType: true,
        ownedByFirm: {
          select: {
            firmName: true,
            firmId: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return listings;
  } catch (error) {
    throw new AppError('Database Error', 500);
  }
};

export const updateListingById = async (
  listingId: string,
  updatedFields: Partial<Listing>,
  updatedBy: string
) => {
  try {
    const listing = await getListingOrThrow(listingId);
    const updatedListing = await prisma.listing.update({
      where: {
        id: listing.id,
      },
      data: {
        ...updatedFields,
        updatedByUserId: updatedBy,
      },
    });
    return updatedListing;
  } catch (error) {
    throw new AppError('Database Error', 500);
  }
};

export const createListing = async (
  listing: Listing,
  userId: string,
  firmId: string
) => {
  try {
    const createdListing = await prisma.listing.upsert({
      where: {
        id: listing.id,
      },
      create: {
        ...listing,
        createdByUserId: userId,
        updatedByUserId: userId,
        ownerFirmId: firmId,
      },
      update: {
        ...listing,
        createdByUserId: userId,
        updatedByUserId: userId,
        ownerFirmId: firmId,
      },
    });

    return createdListing;
  } catch (error) {
    throw new AppError('Database Error', 500);
  }
};

export const installListing = async (
  userId: string,
  firmId: string,
  listingId: string
) => {
  try {
    const listing = await prisma.installedListing.create({
      data: {
        listingId: listingId,
        installedByFirmId: firmId,
        installedByUserId: userId,
      },
    });
    return listing;
  } catch (error) {
    throw new AppError('Database Error', 500);
  }
};

//for a single listing, to get all its requests
export const getListingRequests = async (
  listingId: string,
  status: 'pending' | 'completed',
  currentFirmId: string
) => {
  const statusFilter =
    status === 'pending'
      ? [RequestStatus.pending]
      : status === 'completed'
      ? [RequestStatus.approved, RequestStatus.rejected]
      : [];

  try {
    const listing = await getListingOrThrow(listingId);
    if (listing.ownerFirmId !== currentFirmId) {
      throw new AppError(
        'You do not have permission to view these requests',
        403
      );
    }

    const requests = await prisma.listingAccessControl.findMany({
      where: {
        listingId: listingId,
        requestStatus: {
          in: statusFilter,
        },
      },
      include: {
        requestingFirm: {
          select: {
            firmName: true,
            firmId: true,
          },
        },
        requestingUser: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        actionedBy: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return requests;
  } catch (error) {
    throw new AppError('Database Error', 500);
  }
};

// SERVICES BELOW Utilized by savedListingController.ts
export const saveOrUnsaveListing = async (
  listingId: string,
  userId: string,
  METHOD: 'POST' | 'DELETE'
) => {
  try {
    const listing = await getListingOrThrow(listingId);
    if (listing.visibility === 'private') {
      throw new AppError('Cannot save or unsave private listings', 403);
    }
    if (listing.status !== 'active' && METHOD === 'POST') {
      throw new AppError('Listing is not active', 403);
    }

    if (METHOD === 'POST') {
      await prisma.savedListing.create({
        data: {
          savedByUserId: userId,
          listingId: listingId,
        },
      });

      return { success: true, message: 'Listing saved successfully' };
    } else if (METHOD === 'DELETE') {
      await prisma.savedListing.deleteMany({
        where: {
          savedByUserId: userId,
          listingId: listingId,
        },
      });

      return { success: true, message: 'Listing unsaved successfully' };
    }
  } catch (error) {
    throw new AppError('Database Error', 500);
  }
};

export const getSavedListings = async (userId: string) => {
  try {
    const savedListings = await prisma.savedListing.findMany({
      where: { savedByUserId: userId },
      include: {
        listing: {
          select: {
            imagesLink: true,
            name: true,
            id: true,
            status: true,
            ownedByFirm: {
              select: {
                firmName: true,
                firmId: true,
              },
            },
          },
        },
      },
    });

    return savedListings;
  } catch (error) {
    throw new AppError('Database Error', 500);
  }
};

// SERVICES BELOW Utilized by installationController.ts
export const getInstalledListingsFromDb = async (firmId: string) => {
  try {
    const installedListings = await prisma.installedListing.findMany({
      where: {
        installedByFirmId: firmId,
      },
      include: {
        installedByUser: {
          select: {
            firstName: true,
            lastName: true,
            // profileImage: true,
          },
        },
        listing: {
          select: {
            name: true,
            contentType: true,
            status: true,
            ownedByFirm: {
              select: {
                firmName: true,
                firmId: true,
              },
            },
          },
        },
      },
    });
    return installedListings;
  } catch (error) {
    throw new AppError('Database Error', 500);
  }
};

// SERVICES BELOW utilized by requestController.ts
export const getRequestedListingsFromDb = async (firmId: string) => {
  try {
    const requestedListings = await prisma.listingAccessControl.findMany({
      where: {
        requestedByFirmId: firmId,
      },
      include: {
        requestingUser: {
          select: {
            firstName: true,
            lastName: true,
            // profileImage: true,
          },
        },
        listing: {
          select: {
            name: true,
            contentType: true,
            ownedByFirm: {
              select: {
                firmName: true,
                firmId: true,
              },
            },
            status: true,
          },
        },
      },
    });
    return requestedListings;
  } catch (error) {
    throw new AppError('Database Error', 500);
  }
};

export const getFirmListingRequests = async (
  firmId: string,
  status: 'pending' | 'completed'
) => {
  try {
    const statusFilter =
      status === 'pending'
        ? ['pending']
        : status === 'completed'
        ? ['approved', 'rejected']
        : [];

    // To get the number of unique listings requested
    const listingsRequested = await prisma.listingAccessControl.findMany({
      where: {
        requestStatus: {
          in: statusFilter as RequestStatus[],
        },
        listing: {
          ownerFirmId: firmId,
        },
      },
      select: {
        listingId: true,
      },
      distinct: ['listingId'],
    });

    // Get all the listing requests
    const listingRequests = await prisma.listingAccessControl.findMany({
      where: {
        requestStatus: {
          in: statusFilter as RequestStatus[],
        },
        listing: {
          ownerFirmId: firmId,
        },
      },
      include: {
        requestingUser: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        requestingFirm: {
          select: {
            firmName: true,
          },
        },
        listing: {
          select: {
            id: true,
            name: true,
            contentType: true,
          },
        },
        actionedBy: {
          select: {
            firstName: true,
            lastName: true,
            // profileImage: true,
          },
        },
      },
    });

    return {
      listingRequests,
      listingsRequestedCount: listingsRequested.length,
      totalRequests: listingRequests.length,
    };
  } catch (error) {
    throw new AppError('Database Error', 500);
  }
};

export const updateListingRequest = async (
  requestId: string,
  action: 'approve' | 'reject',
  actionedByUserId: string,
  currentFirmId: string
) => {
  try {
    const request = await prisma.listingAccessControl.findUniqueOrThrow({
      where: {
        id: requestId,
      },
    });

    const listing = await getListingOrThrow(request.listingId);

    if (listing.ownerFirmId !== currentFirmId) {
      throw new AppError(
        'You do not have permission to update this request',
        403
      );
    }
    if (request.requestStatus !== 'pending') {
      throw new AppError('Request is not in a state that can be updated', 400);
    }

    const updatedRequest = await prisma.listingAccessControl.update({
      where: {
        id: requestId,
      },
      data: {
        requestStatus: action === 'approve' ? 'approved' : 'rejected',
        actionedByUserId: actionedByUserId,
      },
    });

    return updatedRequest;
  } catch (error) {
    throw new AppError('Database Error', 500);
  }
};

export const requestListingAccess = async (
  listingId: string,
  requestingFirmId: string,
  requestingUserId: string
) => {
  try {
    // console.log(listingId, requestingFirmId, requestingUserId);
    const listing = await getListingOrThrow(listingId);

    if (
      listing.visibility !== 'request_access' ||
      listing.status !== 'active'
    ) {
      throw new AppError('Listing is not available for access requests', 403);
    }

    const request = await prisma.listingAccessControl.create({
      data: {
        listingId: listing.id,
        requestedByFirmId: requestingFirmId,
        requestedByUserId: requestingUserId,
      },
    });

    return request;
  } catch (error) {
    throw new AppError('Database Error', 500);
  }
};
