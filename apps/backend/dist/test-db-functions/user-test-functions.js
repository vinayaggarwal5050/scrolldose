"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userData1 = {
    "userEmail": "user1@gmail.com",
    "userPassword": "user1@123",
    "userName": "user1"
};
const userData2 = {
    "userEmail": "user2@gmail.com",
    "userPassword": "user2@123",
    "userName": "user2"
};
const testUserFunctions = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log( await createUser(userData2) );
    // console.log( await getAllUsers()) ;
    // console.log( await getUserByUserEmail("user2@gmail.com") );
    // console.log( await getUserByUserId(2) );
    // console.log( await updateUserForUserEmail({userName: "USER1", userCountry: "India", userCity: "Delhi"}, "user1@gmail.com" ) );
    // console.log( await updateUserForUserId({userName: "USER2", userCountry: "India", userState: "Punjab", userCity: "Chandigarh"}, 2 ) );
});
testUserFunctions();
