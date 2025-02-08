/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "url" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Video_url_key" ON "Video"("url");
