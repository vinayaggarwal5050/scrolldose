/*
  Warnings:

  - A unique constraint covering the columns `[filePath]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "filePath" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Video_filePath_key" ON "Video"("filePath");
