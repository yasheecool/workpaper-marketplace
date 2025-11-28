-- DropForeignKey
ALTER TABLE "ListingAccessControl" DROP CONSTRAINT "ListingAccessControl_actionedByUserId_fkey";

-- AlterTable
ALTER TABLE "ListingAccessControl" ALTER COLUMN "actionedByUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ListingAccessControl" ADD CONSTRAINT "ListingAccessControl_actionedByUserId_fkey" FOREIGN KEY ("actionedByUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
