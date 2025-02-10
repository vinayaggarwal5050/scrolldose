/*
  Warnings:

  - Added the required column `globalSubCategoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "globalSubCategoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_globalSubCategoryId_fkey" FOREIGN KEY ("globalSubCategoryId") REFERENCES "GlobalSubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
