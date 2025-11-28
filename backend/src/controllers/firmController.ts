import {
  getFirmById,
  getFirmCreatedListings,
  getVendorProfileByFirmId,
  updateVendorProfile as updateVendorProfileInDb,
} from '../services/firmService';
import { getWorkpapersContent } from '../services/workpapersService';
import { asyncHandler } from '../types';

// GET /api/firm
export const getFirm: asyncHandler = async (req, res, next) => {
  try {
    const firm = await getFirmById(req.firm);

    res.status(200).json({ success: true, data: firm });
  } catch (error) {
    next(error);
  }
};

// GET /api/firm/createdListings
export const getCreatedListings: asyncHandler = async (req, res, next) => {
  const firmId = req.firm;

  try {
    const listings = await getFirmCreatedListings(firmId);
    res.status(200).json({ success: true, data: listings });
  } catch (err) {
    next(err);
  }
};

// GET /api/firm/:firmId/vendorProfile - firm id is passed because the same route is also used to get the vendor profile when the user is viewing vendor details of a listing
export const getVendorProfile: asyncHandler = async (
  req,
  res,
  next
): Promise<void> => {
  const { firmId } = req.params;
  try {
    const vendorProfile = await getVendorProfileByFirmId(firmId);

    res.status(200).json({ success: true, data: vendorProfile });
  } catch (err) {
    next(err);
  }
};

// TODO: FIXME: Check the workpapers content service and the workpapers API, this is a temporary implementation which should be replaced with the actual API call
// GET /api/firm/content - getContent is used to get the content for the listing creation page
export const getContentForCreation: asyncHandler = async (req, res, next) => {
  const firmId = req.firm;

  const workpapersContent = await getWorkpapersContent(firmId);

  res.status(200).json({ success: true, data: workpapersContent });
};

// PATCH /api/firm/vendorProfile
export const updateVendorProfile: asyncHandler = async (req, res, next) => {
  const { firm: firmId } = req;
  const { updatedFields } = req.body;
  try {
    const updatedProfile = await updateVendorProfileInDb(firmId, updatedFields);

    res.status(200).json({ success: true, data: updatedProfile });
  } catch (err) {
    next(err);
  }
};
