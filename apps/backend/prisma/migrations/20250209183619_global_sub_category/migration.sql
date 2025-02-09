/*
  Warnings:

  - You are about to drop the `SubCategory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_globcalCategoryId_fkey";

-- DropTable
DROP TABLE "SubCategory";

-- CreateTable
CREATE TABLE "GlobalSubCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "globcalCategoryId" INTEGER NOT NULL,

    CONSTRAINT "GlobalSubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GlobalSubCategory_globcalCategoryId_key" ON "GlobalSubCategory"("globcalCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- AddForeignKey
ALTER TABLE "GlobalSubCategory" ADD CONSTRAINT "GlobalSubCategory_globcalCategoryId_fkey" FOREIGN KEY ("globcalCategoryId") REFERENCES "GlobalCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
