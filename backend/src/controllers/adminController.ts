import { asyncHandler } from '../types';
import {
  getVendorRequestsFromDb,
  updateVendorRequest,
} from '../services/adminService';

export const getVendorRequests: asyncHandler = async (req, res, next) => {
  try {
    const vendorRequests = await getVendorRequestsFromDb();
    console.log('Vendor Requests:', vendorRequests);
    res.status(200).json({ success: true, vendorRequests });
  } catch (error) {
    next(error);
  }
};

export const actionVendorRequest: asyncHandler = async (req, res, next) => {
  const { requestId } = req.params;
  const { action } = req.body;
  const userId = req.user;

  try {
    // const request
    const request = await updateVendorRequest(requestId, action, userId);
    res.status(200).json({
      success: true,
      message: `Request ${request.requestId} has been ${action}`,
    });
  } catch (error) {
    next(error);
  }
};
