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
exports.deleteStoreById = exports.updateStoreForChannelPartnerEmail = exports.updateStoreForId = exports.getStoreByChannelPartnerEmail = exports.getStoreByChannelPartnerId = exports.getStoreById = exports.getAllStores = exports.createStore = void 0;
const signelton_1 = require("./signelton");
const prisma = (0, signelton_1.getPrismaClient)();
const createStore = (storeData, channelPartnerID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.store.create({
            data: {
                name: storeData.name,
                slug: storeData === null || storeData === void 0 ? void 0 : storeData.slug,
                channelPartner: {
                    connect: {
                        id: channelPartnerID
                    }
                }
            },
        });
        return response;
    }
    catch (error) {
        console.error('Error creating store:', error);
        return error;
    }
});
exports.createStore = createStore;
const getAllStores = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.store.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                channelPartnerId: true,
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error fetching stores:', error);
        return error;
    }
});
exports.getAllStores = getAllStores;
const getStoreById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.store.findFirst({
            where: {
                id: id
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error Finding stores:', error);
        return error;
    }
});
exports.getStoreById = getStoreById;
const getStoreByChannelPartnerId = (channelPartnerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.store.findFirst({
            where: {
                channelPartnerId: channelPartnerId
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error Finding stores:', error);
        return error;
    }
});
exports.getStoreByChannelPartnerId = getStoreByChannelPartnerId;
const getStoreByChannelPartnerEmail = (channelPartnerEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.channelPartner.findUnique({
            where: {
                email: channelPartnerEmail
            },
            include: {
                store: true
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error Finding stores:', error);
        return error;
    }
});
exports.getStoreByChannelPartnerEmail = getStoreByChannelPartnerEmail;
const updateStoreForId = (storeData, storeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedStore = yield prisma.store.update({
            where: {
                id: storeId
            },
            data: {
                name: storeData === null || storeData === void 0 ? void 0 : storeData.name,
                slug: storeData === null || storeData === void 0 ? void 0 : storeData.slug,
            }
        });
        return updatedStore;
    }
    catch (error) {
        console.error('Error Finding stores:', error);
        return error;
    }
});
exports.updateStoreForId = updateStoreForId;
const updateStoreForChannelPartnerEmail = (storeData, channelPartnerEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channelPartner = yield prisma.channelPartner.findFirst({
            where: {
                email: channelPartnerEmail
            },
            include: {
                store: true
            }
        });
        if (!channelPartner || !channelPartner.store) {
            console.log("Channel Partner or Store not found");
            return null;
        }
        const updatedStore = yield prisma.store.update({
            where: {
                id: channelPartner.store[0].id
            },
            data: {
                name: storeData === null || storeData === void 0 ? void 0 : storeData.name,
                slug: storeData === null || storeData === void 0 ? void 0 : storeData.slug,
            }
        });
        return updatedStore;
    }
    catch (error) {
        console.error('Error Finding stores:', error);
        return error;
    }
});
exports.updateStoreForChannelPartnerEmail = updateStoreForChannelPartnerEmail;
// export const updatestoreforEmail = async(data: storeUpdateInterface) => {
//   try {
//     const response = await prisma.store.update({
//       where: {
//         email: data?.email
//       },
//       data: {
//         password: data?.password,
//         name: data?.name
//       }
//     })
//     return response;
//   } catch(error) {
//     console.error('Error Updating store:', error);
//     return error;
//   }
// }
// export const updatestoreforId = async(data: storeUpdateInterface) => {
//   try {
//     const response = await prisma.store.update({
//       where: {
//         id: data?.id
//       },
//       data: {
//         email: data?.email,
//         password: data?.password,
//         name: data?.name
//       }
//     })
//     return response;
//   } catch(error) {
//     console.error('Error Updating store:', error);
//     return error;
//   }
// }
const deleteStoreById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.store.delete({
            where: {
                id: id
            }
        });
    }
    catch (error) {
        console.error('Error Deleting store:', error);
        return error;
    }
});
exports.deleteStoreById = deleteStoreById;
