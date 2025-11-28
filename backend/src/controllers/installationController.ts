import { asyncHandler } from '../types';
import prisma from '../config/dbClient';
import {
  getInstalledListingsFromDb,
  installListing,
} from '../services/listingService';
import { subscribeToWorkpapersContent } from '../services/workpapersService';
import { AppError } from '../errors/AppError';

export const getInstalledListings: asyncHandler = async (req, res, next) => {
  const firmId = req.firm;

  try {
    const installedListings = await getInstalledListingsFromDb(firmId);
    res.status(200).json({ success: true, data: installedListings });
    return;
  } catch (error) {
    next(error);
  }
};

// TODO: FIXME: Check the workpapers content service and the workpapers API, this is a temporary implementation which should be replaced with the actual API call. Move this logic into a service file
export const handleInstallListing: asyncHandler = async (req, res, next) => {
  const { firm: firmId, user: userId } = req;
  const { listingId } = req.params;

  try {
    const subscriptionResponse = await subscribeToWorkpapersContent(
      firmId,
      userId,
      listingId
    );

    if (!subscriptionResponse!.success) {
      throw new AppError('Subscription failed', 400);
    }

    const listing = await installListing(userId, firmId, listingId);

    res.status(201).json({ success: true, listing });
  } catch (e) {
    next(e);
  }
};

export const uninstallListing: asyncHandler = async (req, res) => {
  const { firm: firmId } = req;
  const { listingId } = req.params;

  try {
    const listing = await prisma.installedListing.delete({
      where: {
        installedByFirmId_listingId: {
          listingId: listingId,
          installedByFirmId: firmId,
        },
      },
    });
    res
      .status(201)
      .json({ success: true, message: 'Listing uninstalled successfully' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e }).end();
  }
};
