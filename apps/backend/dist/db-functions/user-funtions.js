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
exports.deleteUserForUserEmail = exports.deleteUserForUserId = exports.updateUserForUserId = exports.updateUserForUserEmail = exports.getUserByUserId = exports.getUserByUserEmail = exports.getAllUsers = exports.createUser = void 0;
const signelton_1 = require("./signelton");
const prisma = (0, signelton_1.getPrismaClient)();
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.user.create({
            data: {
                userEmail: userData.userEmail,
                userPassword: userData.userPassword,
                userName: userData === null || userData === void 0 ? void 0 : userData.userName,
                userInterests: userData === null || userData === void 0 ? void 0 : userData.userInterests,
                userWishlist: userData === null || userData === void 0 ? void 0 : userData.userWishlist,
                userSubscribedStoreId: userData === null || userData === void 0 ? void 0 : userData.userSubscribedStoreId,
                userAddress1: userData === null || userData === void 0 ? void 0 : userData.userAddress1,
                userAddress2: userData === null || userData === void 0 ? void 0 : userData.userAddress2,
                userCity: userData === null || userData === void 0 ? void 0 : userData.userCity,
                userState: userData === null || userData === void 0 ? void 0 : userData.userState,
                userPincode: userData === null || userData === void 0 ? void 0 : userData.userPincode,
                userCountry: userData === null || userData === void 0 ? void 0 : userData.userCountry
            },
        });
        return response;
    }
    catch (error) {
        console.error('Error creating user:', error);
        return error;
    }
});
exports.createUser = createUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.user.findMany({
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
        });
        return response;
    }
    catch (error) {
        console.error('Error fetching Superadmins:', error);
        return error;
    }
});
exports.getAllUsers = getAllUsers;
const getUserByUserEmail = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.user.findFirst({
            where: {
                userEmail: userEmail
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error Finding User:', error);
        return error;
    }
});
exports.getUserByUserEmail = getUserByUserEmail;
const getUserByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.user.findFirst({
            where: {
                userId: userId
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error Finding UserId:', error);
        return error;
    }
});
exports.getUserByUserId = getUserByUserId;
const updateUserForUserEmail = (data, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.user.update({
            where: {
                userEmail: userEmail
            },
            data: {
                userName: data === null || data === void 0 ? void 0 : data.userName,
                userPassword: data === null || data === void 0 ? void 0 : data.userPassword,
                userInterests: data === null || data === void 0 ? void 0 : data.userInterests,
                userWishlist: data === null || data === void 0 ? void 0 : data.userWishlist,
                userSubscribedStoreId: data === null || data === void 0 ? void 0 : data.userSubscribedStoreId,
                userAddress1: data === null || data === void 0 ? void 0 : data.userAddress1,
                userAddress2: data === null || data === void 0 ? void 0 : data.userAddress2,
                userCity: data === null || data === void 0 ? void 0 : data.userCity,
                userState: data === null || data === void 0 ? void 0 : data.userState,
                userPincode: data === null || data === void 0 ? void 0 : data.userPincode,
                userCountry: data === null || data === void 0 ? void 0 : data.userCountry
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error Updating User:', error);
        return error;
    }
});
exports.updateUserForUserEmail = updateUserForUserEmail;
const updateUserForUserId = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.user.update({
            where: {
                userId: userId
            },
            data: {
                userName: data === null || data === void 0 ? void 0 : data.userName,
                userEmail: data === null || data === void 0 ? void 0 : data.userEmail,
                userPassword: data === null || data === void 0 ? void 0 : data.userPassword,
                userInterests: data === null || data === void 0 ? void 0 : data.userInterests,
                userWishlist: data === null || data === void 0 ? void 0 : data.userWishlist,
                userSubscribedStoreId: data === null || data === void 0 ? void 0 : data.userSubscribedStoreId,
                userAddress1: data === null || data === void 0 ? void 0 : data.userAddress1,
                userAddress2: data === null || data === void 0 ? void 0 : data.userAddress2,
                userCity: data === null || data === void 0 ? void 0 : data.userCity,
                userState: data === null || data === void 0 ? void 0 : data.userState,
                userPincode: data === null || data === void 0 ? void 0 : data.userPincode,
                userCountry: data === null || data === void 0 ? void 0 : data.userCountry
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error Updating User:', error);
        return error;
    }
});
exports.updateUserForUserId = updateUserForUserId;
const deleteUserForUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.user.delete({
            where: {
                userId: userId
            }
        });
    }
    catch (error) {
        console.error('Error selecting User:', error);
        return error;
    }
});
exports.deleteUserForUserId = deleteUserForUserId;
const deleteUserForUserEmail = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.user.delete({
            where: {
                userEmail: userEmail
            }
        });
    }
    catch (error) {
        console.error('Error selecting user:', error);
        return error;
    }
});
exports.deleteUserForUserEmail = deleteUserForUserEmail;
