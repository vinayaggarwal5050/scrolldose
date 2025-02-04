-- CreateTable
CREATE TABLE "Studio" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "channelPartnerId" INTEGER NOT NULL,

    CONSTRAINT "Studio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Studio_link_key" ON "Studio"("link");

-- CreateIndex
CREATE UNIQUE INDEX "Studio_channelPartnerId_key" ON "Studio"("channelPartnerId");

-- AddForeignKey
ALTER TABLE "Studio" ADD CONSTRAINT "Studio_channelPartnerId_fkey" FOREIGN KEY ("channelPartnerId") REFERENCES "ChannelPartner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
