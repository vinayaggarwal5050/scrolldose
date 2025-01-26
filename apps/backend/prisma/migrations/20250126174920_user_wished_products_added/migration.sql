-- CreateTable
CREATE TABLE "_UserWishesProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserWishesProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserWishesProduct_B_index" ON "_UserWishesProduct"("B");

-- AddForeignKey
ALTER TABLE "_UserWishesProduct" ADD CONSTRAINT "_UserWishesProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserWishesProduct" ADD CONSTRAINT "_UserWishesProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
