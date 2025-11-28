/*
  Warnings:

  - The values [global_whitelist] on the enum `ListingVisibility` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('active', 'deleted');

-- AlterEnum
BEGIN;
CREATE TYPE "ListingVisibility_new" AS ENUM ('public', 'request_access', 'private');
ALTER TABLE "Listing" ALTER COLUMN "visibility" DROP DEFAULT;
ALTER TABLE "Listing" ALTER COLUMN "visibility" TYPE "ListingVisibility_new" USING ("visibility"::text::"ListingVisibility_new");
ALTER TYPE "ListingVisibility" RENAME TO "ListingVisibility_old";
ALTER TYPE "ListingVisibility_new" RENAME TO "ListingVisibility";
DROP TYPE "ListingVisibility_old";
ALTER TABLE "Listing" ALTER COLUMN "visibility" SET DEFAULT 'public';
COMMIT;

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "status" "ListingStatus" NOT NULL DEFAULT 'active';
