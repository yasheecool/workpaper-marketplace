import { asyncHandler } from '../types';
import {
  getUserOrThrow,
  updateUserProfile as updateUserProfileInDb,
  getUserFirms as getUserFirmsFromDb,
} from '../services/userService';

// GET /api/user
export const getUser: asyncHandler = async (req, res, next) => {
  const userId = req.user;
  // console.log('userId', userId);
  try {
    const user = await getUserOrThrow(userId);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/user/profile
export const updateUserProfile: asyncHandler = async (req, res, next) => {
  const userId = req.user;
  const { updatedFields } = req.body;

  try {
    const updatedUser = await updateUserProfileInDb(userId, updatedFields);
    res.status(200).json({ success: true, data: updatedUser });
  } catch (err) {
    next(err);
  }
};

// GET /api/user/firms
export const getUserFirms: asyncHandler = async (req, res, next) => {
  const userToken = JSON.parse(req.headers.authorization!);
  const userFirms = userToken.workpapers.firms;

  try {
    const firms = await getUserFirmsFromDb(userFirms);
    res.status(200).json({ success: true, data: firms });
  } catch (error) {
    next(error);
  }
};
