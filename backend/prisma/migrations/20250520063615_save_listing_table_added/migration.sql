-- CreateTable
CREATE TABLE "SavedListing" (
    "id" TEXT NOT NULL,
    "savedByUserId" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "saveTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedListing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedListing_savedByUserId_listingId_key" ON "SavedListing"("savedByUserId", "listingId");

-- AddForeignKey
ALTER TABLE "SavedListing" ADD CONSTRAINT "SavedListing_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedListing" ADD CONSTRAINT "SavedListing_savedByUserId_fkey" FOREIGN KEY ("savedByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
