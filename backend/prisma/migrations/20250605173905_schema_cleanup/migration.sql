/*
  Warnings:

  - You are about to drop the `FirmWhitelist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ListingChangeRecords` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FirmWhitelist" DROP CONSTRAINT "FirmWhitelist_actionedBy_fkey";

-- DropForeignKey
ALTER TABLE "FirmWhitelist" DROP CONSTRAINT "FirmWhitelist_userFirmId_fkey";

-- DropForeignKey
ALTER TABLE "FirmWhitelist" DROP CONSTRAINT "FirmWhitelist_vendorFirmId_fkey";

-- DropForeignKey
ALTER TABLE "ListingChangeRecords" DROP CONSTRAINT "ListingChangeRecords_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "ListingChangeRecords" DROP CONSTRAINT "ListingChangeRecords_listingId_fkey";

-- DropTable
DROP TABLE "FirmWhitelist";

-- DropTable
DROP TABLE "ListingChangeRecords";
