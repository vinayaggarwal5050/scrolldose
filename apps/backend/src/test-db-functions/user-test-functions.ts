import  { UserInterface, createUser, getAllUsers, getUserByUserEmail, getUserByUserId, updateUserForUserEmail, updateUserForUserId, deleteUserForUserEmail, deleteUserForUserId } from "../db-functions/user-funtions"

//.................super admin funtions..............................................................
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
}

const userData1: UserInterface = {
  "userEmail": "user1@gmail.com",
  "userPassword": "user1@123",
  "userName": "user1"
};

const userData2: UserInterface = {
  "userEmail": "user2@gmail.com",
  "userPassword": "user2@123",
  "userName": "user2"
};

const testUserFunctions = async () => { 
  // console.log( await createUser(userData2) );
  // console.log( await getAllUsers()) ;
  // console.log( await getUserByUserEmail("user2@gmail.com") );
  // console.log( await getUserByUserId(2) );
  // console.log( await updateUserForUserEmail({userName: "USER1", userCountry: "India", userCity: "Delhi"}, "user1@gmail.com" ) );
  // console.log( await updateUserForUserId({userName: "USER2", userCountry: "India", userState: "Punjab", userCity: "Chandigarh"}, 2 ) );

} 

testUserFunctions();


