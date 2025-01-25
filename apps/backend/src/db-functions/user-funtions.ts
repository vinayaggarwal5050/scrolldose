import { getPrismaClient } from "./signelton";

const prisma = getPrismaClient();

export interface UserInterface {
  userName: string;
  userEmail: string;
  userPassword: string;
  userInterests?: string;
  userWishlist?: string;
  userAddress1?: string;
  userAddress2?: string;
  userCity?: string;
  userState?: string;
  userPincode?: string;
  userCountry?: string;
  userSubscribedStoreId? : number;
}

export const createUser = async(userData: UserInterface) => {
  try {
    const response = await prisma.user.create({
      data: {
        userEmail: userData.userEmail,
        userPassword: userData.userPassword,
        userName: userData?.userName,
        userInterests: userData?.userInterests,
        userWishlist: userData?.userWishlist,
        userSubscribedStoreId: userData?.userSubscribedStoreId,
        userAddress1: userData?.userAddress1,
        userAddress2: userData?.userAddress2,
        userCity: userData?.userCity,
        userState: userData?.userState,
        userPincode: userData?.userPincode,
        userCountry: userData?.userCountry
      },
    })

    return response;

  } catch(error) {
    console.error('Error creating user:', error);
    return error;
  }

}

export const getAllUsers = async() => {
  try {
    const response  = await prisma.user.findMany({
     select: {
      userId: true,
      userEmail: true,
      userPassword: true,
      userName: true,
      userInterests: true,
      userWishlist: true,
      userSubscribedStoreId: true,
      userAddress1: true,
      userAddress2: true,
      userCity: true,
      userState: true,
      userPincode: true,
      userCountry: true,
     } 
    })
    return response;

  } catch(error) {
    console.error('Error fetching Superadmins:', error);
    return error;
  }
} 

export const getUserByUserEmail = async(userEmail: string) => {
  try {
    const response = await prisma.user.findFirst({
      where: {
        userEmail: userEmail
      }
    })

    return response;

  } catch(error) {
    console.error('Error Finding User:', error);
    return error;
  }
}

export const getUserByUserId = async(userId: number) => {
  try {
    const response = await prisma.user.findFirst({
      where: {
        userId: userId
      }
    })

    return response;

  } catch(error) {
    console.error('Error Finding UserId:', error);
    return error;
  }
}

interface UserUpdateInterface {
  userName?: string;
  userEmail?: string;
  userPassword?: string;
  userInterests?: string;
  userWishlist?: string;
  userAddress1?: string;
  userAddress2?: string;
  userCity?: string;
  userState?: string;
  userPincode?: string;
  userCountry?: string;
  userSubscribedStoreId? : number;
  userOldPassword?: string;
}

export const updateUserForUserEmail = async(data: UserUpdateInterface, userEmail: string) => {
  try {
    const response = await prisma.user.update({
      where: {
        userEmail: userEmail
      },
      data: {
        userName: data?.userName,
        userPassword: data?.userPassword,
        userInterests: data?.userInterests,
        userWishlist: data?.userWishlist,
        userSubscribedStoreId: data?.userSubscribedStoreId,
        userAddress1: data?.userAddress1,
        userAddress2: data?.userAddress2,
        userCity: data?.userCity,
        userState: data?.userState,
        userPincode: data?.userPincode,
        userCountry: data?.userCountry
      }
    })

    return response;

  } catch(error) {
    console.error('Error Updating User:', error);
    return error;
  }
}

export const updateUserForUserId = async(data: UserUpdateInterface, userId: number) => {
  try {
    const response = await prisma.user.update({
      where: {
        userId: userId
      },
      data: {
        userName: data?.userName,
        userEmail: data?.userEmail,
        userPassword: data?.userPassword,
        userInterests: data?.userInterests,
        userWishlist: data?.userWishlist,
        userSubscribedStoreId: data?.userSubscribedStoreId,
        userAddress1: data?.userAddress1,
        userAddress2: data?.userAddress2,
        userCity: data?.userCity,
        userState: data?.userState,
        userPincode: data?.userPincode,
        userCountry: data?.userCountry
      }
    })

    return response;

  } catch(error) {
    console.error('Error Updating User:', error);
    return error;
  }
}

export const deleteUserForUserId = async(userId: number) => {
  try {
    const response = await prisma.user.delete({
      where: {
        userId: userId
      }
    })

  } catch(error) {
    console.error('Error selecting User:', error);
    return error;
  }
}

export const deleteUserForUserEmail = async(userEmail: string) => {
  try {
    const response = await prisma.user.delete({
      where: {
        userEmail: userEmail
      }
    })

  } catch(error) {
    console.error('Error selecting user:', error);
    return error;
  }
}
