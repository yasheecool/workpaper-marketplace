/*
  Warnings:

  - The primary key for the `VendorRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `requestedBy` on the `VendorRequest` table. All the data in the column will be lost.
  - You are about to drop the column `requestingFirm` on the `VendorRequest` table. All the data in the column will be lost.
  - You are about to drop the column `vendorContactEmail` on the `VendorRequest` table. All the data in the column will be lost.
  - You are about to drop the column `vendorContactPhone` on the `VendorRequest` table. All the data in the column will be lost.
  - You are about to drop the column `vendorWebsite` on the `VendorRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[requestingFirmId]` on the table `VendorRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contactEmail` to the `VendorRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPhone` to the `VendorRequest` table without a default value. This is not possible if the table is not empty.
  - The required column `requestId` was added to the `VendorRequest` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `requestedByUserId` to the `VendorRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestingFirmId` to the `VendorRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VendorRequest" DROP CONSTRAINT "VendorRequest_actionedBy_fkey";

-- DropForeignKey
ALTER TABLE "VendorRequest" DROP CONSTRAINT "VendorRequest_requestingFirm_fkey";

-- AlterTable
ALTER TABLE "VendorRequest" DROP CONSTRAINT "VendorRequest_pkey",
DROP COLUMN "requestedBy",
DROP COLUMN "requestingFirm",
DROP COLUMN "vendorContactEmail",
DROP COLUMN "vendorContactPhone",
DROP COLUMN "vendorWebsite",
ADD COLUMN     "contactEmail" TEXT NOT NULL,
ADD COLUMN     "contactPhone" TEXT NOT NULL,
ADD COLUMN     "requestId" TEXT NOT NULL,
ADD COLUMN     "requestedByUserId" TEXT NOT NULL,
ADD COLUMN     "requestingFirmId" TEXT NOT NULL,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "actionedAt" DROP NOT NULL,
ALTER COLUMN "actionedBy" DROP NOT NULL,
ADD CONSTRAINT "VendorRequest_pkey" PRIMARY KEY ("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "VendorRequest_requestingFirmId_key" ON "VendorRequest"("requestingFirmId");

-- AddForeignKey
ALTER TABLE "VendorRequest" ADD CONSTRAINT "VendorRequest_requestedByUserId_fkey" FOREIGN KEY ("requestedByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorRequest" ADD CONSTRAINT "VendorRequest_requestingFirmId_fkey" FOREIGN KEY ("requestingFirmId") REFERENCES "Firm"("firmId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorRequest" ADD CONSTRAINT "VendorRequest_actionedBy_fkey" FOREIGN KEY ("actionedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
