/*
  Warnings:

  - You are about to drop the column `globcalCategoryId` on the `GlobalSubCategory` table. All the data in the column will be lost.
  - Added the required column `globalCategoryId` to the `GlobalSubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GlobalSubCategory" DROP CONSTRAINT "GlobalSubCategory_globcalCategoryId_fkey";

-- DropIndex
DROP INDEX "GlobalSubCategory_globcalCategoryId_key";

-- AlterTable
ALTER TABLE "GlobalSubCategory" DROP COLUMN "globcalCategoryId",
ADD COLUMN     "globalCategoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "GlobalSubCategory" ADD CONSTRAINT "GlobalSubCategory_globalCategoryId_fkey" FOREIGN KEY ("globalCategoryId") REFERENCES "GlobalCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
