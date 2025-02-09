/*
  Warnings:

  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `Product` table. All the data in the column will be lost.
  - Made the column `slug` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
DROP COLUMN "link",
DROP COLUMN "video",
ADD COLUMN     "affiliateHost" TEXT,
ADD COLUMN     "affiliateLink" TEXT,
ADD COLUMN     "isAffiliateLink" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mainImageUrl" TEXT,
ADD COLUMN     "otherImagesUrl" TEXT,
ADD COLUMN     "stock" INTEGER,
ADD COLUMN     "videoId" INTEGER,
ADD COLUMN     "videoUrl" TEXT,
ALTER COLUMN "slug" SET NOT NULL;
