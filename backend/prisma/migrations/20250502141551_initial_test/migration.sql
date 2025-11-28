-- CreateEnum
CREATE TYPE "VendorStatus" AS ENUM ('active', 'blocked');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "ListingVisibility" AS ENUM ('public', 'global_whitelist', 'request_access', 'private');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('australia', 'newZealand', 'unitedKingdom', 'republicOfIreland');

-- CreateEnum
CREATE TYPE "WorkpaperType" AS ENUM ('compliance', 'itr', 'bas', 'taxPlanning', 'fbt', 'other');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('company', 'individual', 'partnership', 'trust', 'other');

-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('calculation', 'checklist', 'report', 'procedure', 'wiki');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profileImage" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Firm" (
    "firmId" TEXT NOT NULL,
    "firmName" TEXT NOT NULL,
    "isVendor" BOOLEAN NOT NULL DEFAULT false,
    "vendorStatus" "VendorStatus",

    CONSTRAINT "Firm_pkey" PRIMARY KEY ("firmId")
);

-- CreateTable
CREATE TABLE "ListingAccessControl" (
    "id" TEXT NOT NULL,
    "requestedByFirmId" TEXT NOT NULL,
    "requestedByUserId" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "actionedByUserId" TEXT NOT NULL,
    "requestStatus" "RequestStatus" NOT NULL DEFAULT 'pending',
    "requestTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actionTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListingAccessControl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FirmWhitelist" (
    "id" TEXT NOT NULL,
    "actionTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userFirmId" TEXT NOT NULL,
    "vendorFirmId" TEXT NOT NULL,
    "actionedBy" TEXT NOT NULL,

    CONSTRAINT "FirmWhitelist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstalledListing" (
    "id" TEXT NOT NULL,
    "installedByUserId" TEXT NOT NULL,
    "installedByFirmId" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "installTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InstalledListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "ownerFirmId" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longDescription" TEXT,
    "gettingStartedSteps" TEXT,
    "region" "Region" NOT NULL,
    "contentType" "ListingType",
    "workpaperType" "WorkpaperType"[],
    "entityType" "EntityType"[],
    "tags" TEXT[],
    "videoLink" TEXT,
    "imagesLink" TEXT[],
    "visibility" "ListingVisibility" NOT NULL DEFAULT 'public',

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListingChangeRecords" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ListingChangeRecords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorProfile" (
    "firmId" TEXT NOT NULL,
    "firmEmail" TEXT NOT NULL,
    "firmLogo" TEXT,
    "description" TEXT NOT NULL,
    "vendorSince" TIMESTAMP(3) NOT NULL,
    "address" TEXT,
    "phoneNumber" TEXT,
    "websiteUrl" TEXT NOT NULL,
    "linkedInUrl" TEXT,

    CONSTRAINT "VendorProfile_pkey" PRIMARY KEY ("firmId")
);

-- CreateTable
CREATE TABLE "VendorRequest" (
    "requestingFirm" TEXT NOT NULL,
    "requestedBy" TEXT NOT NULL,
    "requestStatus" "RequestStatus" NOT NULL DEFAULT 'pending',
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actionedAt" TIMESTAMP(3) NOT NULL,
    "actionedBy" TEXT NOT NULL,
    "vendorContactEmail" TEXT NOT NULL,
    "vendorContactPhone" TEXT NOT NULL,
    "vendorWebsite" TEXT,
    "note" TEXT,

    CONSTRAINT "VendorRequest_pkey" PRIMARY KEY ("requestingFirm")
);

-- CreateIndex
CREATE UNIQUE INDEX "ListingAccessControl_listingId_requestedByFirmId_key" ON "ListingAccessControl"("listingId", "requestedByFirmId");

-- CreateIndex
CREATE UNIQUE INDEX "FirmWhitelist_userFirmId_vendorFirmId_key" ON "FirmWhitelist"("userFirmId", "vendorFirmId");

-- CreateIndex
CREATE UNIQUE INDEX "InstalledListing_installedByFirmId_listingId_key" ON "InstalledListing"("installedByFirmId", "listingId");

-- AddForeignKey
ALTER TABLE "ListingAccessControl" ADD CONSTRAINT "ListingAccessControl_requestedByFirmId_fkey" FOREIGN KEY ("requestedByFirmId") REFERENCES "Firm"("firmId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingAccessControl" ADD CONSTRAINT "ListingAccessControl_requestedByUserId_fkey" FOREIGN KEY ("requestedByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingAccessControl" ADD CONSTRAINT "ListingAccessControl_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingAccessControl" ADD CONSTRAINT "ListingAccessControl_actionedByUserId_fkey" FOREIGN KEY ("actionedByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirmWhitelist" ADD CONSTRAINT "FirmWhitelist_userFirmId_fkey" FOREIGN KEY ("userFirmId") REFERENCES "Firm"("firmId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirmWhitelist" ADD CONSTRAINT "FirmWhitelist_vendorFirmId_fkey" FOREIGN KEY ("vendorFirmId") REFERENCES "Firm"("firmId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirmWhitelist" ADD CONSTRAINT "FirmWhitelist_actionedBy_fkey" FOREIGN KEY ("actionedBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstalledListing" ADD CONSTRAINT "InstalledListing_installedByUserId_fkey" FOREIGN KEY ("installedByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstalledListing" ADD CONSTRAINT "InstalledListing_installedByFirmId_fkey" FOREIGN KEY ("installedByFirmId") REFERENCES "Firm"("firmId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstalledListing" ADD CONSTRAINT "InstalledListing_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_ownerFirmId_fkey" FOREIGN KEY ("ownerFirmId") REFERENCES "Firm"("firmId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingChangeRecords" ADD CONSTRAINT "ListingChangeRecords_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingChangeRecords" ADD CONSTRAINT "ListingChangeRecords_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorProfile" ADD CONSTRAINT "VendorProfile_firmId_fkey" FOREIGN KEY ("firmId") REFERENCES "Firm"("firmId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorRequest" ADD CONSTRAINT "VendorRequest_requestingFirm_fkey" FOREIGN KEY ("requestingFirm") REFERENCES "Firm"("firmId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorRequest" ADD CONSTRAINT "VendorRequest_actionedBy_fkey" FOREIGN KEY ("actionedBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
