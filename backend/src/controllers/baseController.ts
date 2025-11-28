import { asyncHandler } from '../types';
import { createVendorRequest as createVendorRequestInDb } from '../services/baseService';

export const createVendorRequest: asyncHandler = async (req, res, next) => {
  const { requestForm } = req.body;
  const { user: userId, firm: firmId } = req;
  console.log(requestForm);

  try {
    await createVendorRequestInDb(requestForm, userId, firmId);

    res
      .status(200)
      .json({ success: true, message: 'Vendor request handled successfully' });
  } catch (error) {
    next(error);
  }
};
