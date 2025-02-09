/*
  Warnings:

  - Made the column `name` on table `GlobalCategory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `SubCategory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GlobalCategory" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "SubCategory" ALTER COLUMN "name" SET NOT NULL;
