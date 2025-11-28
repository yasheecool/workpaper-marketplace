/*
  Warnings:

  - The values [other] on the enum `EntityType` will be removed. If these variants are still used in the database, this will fail.
  - The values [other] on the enum `WorkpaperType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `videoLink` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `VendorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `VendorProfile` table. All the data in the column will be lost.
  - Made the column `updatedByUserId` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contentType` on table `Listing` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EntityType_new" AS ENUM ('company', 'individual', 'partnership', 'trust');
ALTER TABLE "Listing" ALTER COLUMN "entityType" TYPE "EntityType_new"[] USING ("entityType"::text::"EntityType_new"[]);
ALTER TYPE "EntityType" RENAME TO "EntityType_old";
ALTER TYPE "EntityType_new" RENAME TO "EntityType";
DROP TYPE "EntityType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WorkpaperType_new" AS ENUM ('compliance', 'itr', 'bas', 'taxPlanning', 'fbt');
ALTER TABLE "Listing" ALTER COLUMN "workpaperType" TYPE "WorkpaperType_new"[] USING ("workpaperType"::text::"WorkpaperType_new"[]);
ALTER TYPE "WorkpaperType" RENAME TO "WorkpaperType_old";
ALTER TYPE "WorkpaperType_new" RENAME TO "WorkpaperType";
DROP TYPE "WorkpaperType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "videoLink",
ALTER COLUMN "updatedByUserId" SET NOT NULL,
ALTER COLUMN "contentType" SET NOT NULL,
ALTER COLUMN "imagesLink" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "VendorProfile" DROP COLUMN "address",
DROP COLUMN "phoneNumber",
ALTER COLUMN "vendorSince" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_updatedByUserId_fkey" FOREIGN KEY ("updatedByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
