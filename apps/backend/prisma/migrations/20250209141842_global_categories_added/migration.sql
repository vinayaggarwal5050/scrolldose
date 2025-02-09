-- CreateTable
CREATE TABLE "GlobalCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "slug" TEXT,

    CONSTRAINT "GlobalCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "slug" TEXT,
    "globcalCategoryId" INTEGER NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_globcalCategoryId_key" ON "SubCategory"("globcalCategoryId");

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_globcalCategoryId_fkey" FOREIGN KEY ("globcalCategoryId") REFERENCES "GlobalCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
