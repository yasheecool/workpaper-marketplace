/*
  Warnings:

  - You are about to drop the column `note` on the `VendorRequest` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `VendorRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VendorRequest" DROP COLUMN "note",
DROP COLUMN "website";
