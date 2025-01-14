/*
  Warnings:

  - Made the column `name` on table `Store` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "slug" TEXT,
ALTER COLUMN "name" SET NOT NULL;
