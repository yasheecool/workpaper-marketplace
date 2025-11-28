import prisma from '../config/dbClient';
import { User } from '@prisma/client';
import { AppError } from '../errors/AppError';

//getUserOrThrow is also being used as utility in other service functions here. If the best practice is to only check for user existence based on the userId (from the JWT token), then this function can be removed from the services where it is not needed.

export const getUserOrThrow = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { userId: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  } catch (err) {
    throw new AppError('Database Error', 500);
  }
};

export const updateUserProfile = async (
  userId: string,
  updatedFields: Partial<User>
) => {
  try {
    const user = await getUserOrThrow(userId);
    const updatedUser = await prisma.user.update({
      where: { userId: user.userId },
      data: updatedFields,
    });
    return updatedUser;
  } catch (err) {
    throw new AppError('Database Error', 500);
  }
};

export const getUserSavedListings = async (userId: string) => {
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

// TODO: add proper type for firms
export const getUserFirms = async (userFirms: string[]) => {
  try {
    const firms = await prisma.firm.findMany({
      where: {
        firmId: {
          in: userFirms.map((firm: any) => firm.id),
        },
      },
    });
    return firms;
  } catch (err) {
    throw new AppError('Database Error', 500);
  }
};
