-- CreateTable
CREATE TABLE "user" (
    "userId" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPassword" TEXT NOT NULL,
    "userInterests" TEXT,
    "userWishlist" TEXT,
    "userAddress1" TEXT,
    "userAddress2" TEXT,
    "userCity" TEXT,
    "userState" TEXT,
    "userPincode" TEXT,
    "userCountry" TEXT,
    "userSubscribedStoreId" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userId")
);
