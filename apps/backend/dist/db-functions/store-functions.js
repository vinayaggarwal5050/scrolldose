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
exports.deleteStoreById = exports.updateStoreForChannelPartnerId = exports.updateStoreForChannelPartnerEmail = exports.updateStoreForStoreId = exports.getStoreByChannelPartnerEmail = exports.getStoreByChannelPartnerId = exports.getStoreByStoreId = exports.getAllStores = exports.createStoreForChannelPartnerId = void 0;
const signelton_1 = require("./signelton");
const prisma = (0, signelton_1.getPrismaClient)();
const createStoreForChannelPartnerId = (storeData, channelPartnerID) => __awaiter(void 0, void 0, void 0, function* () {
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
            select: {
                id: true,
                name: true,
                slug: true,
                channelPartnerId: true
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error("Error Occured Whilte creating Store:", error);
        return { status: false, error: "An error occurred while Store" };
    }
});
exports.createStoreForChannelPartnerId = createStoreForChannelPartnerId;
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
const getStoreByStoreId = (storeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.store.findFirst({
            where: {
                id: storeId
            },
            select: {
                id: true,
                name: true,
                slug: true,
                channelPartnerId: true
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error Finding stores:', error);
        return error;
    }
});
exports.getStoreByStoreId = getStoreByStoreId;
const getStoreByChannelPartnerId = (channelPartnerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.store.findFirst({
            where: {
                channelPartnerId: channelPartnerId
            },
            select: {
                id: true,
                name: true,
                slug: true,
                channelPartnerId: true
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
const updateStoreForStoreId = (storeData, storeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedStore = yield prisma.store.update({
            where: {
                id: storeId
            },
            data: {
                name: storeData === null || storeData === void 0 ? void 0 : storeData.name,
                slug: storeData === null || storeData === void 0 ? void 0 : storeData.slug,
            },
            select: {
                id: true,
                channelPartnerId: true,
                name: true,
                slug: true
            }
        });
        return { status: true, data: updatedStore };
    }
    catch (error) {
        console.error('Error Finding stores:', error);
        return { status: false, error: error };
    }
});
exports.updateStoreForStoreId = updateStoreForStoreId;
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
            },
            select: {
                id: true,
                channelPartnerId: true,
                name: true,
                slug: true
            }
        });
        return { status: true, data: updatedStore };
    }
    catch (error) {
        console.error('Error Finding stores:', error);
        return { status: false, error: error };
    }
});
exports.updateStoreForChannelPartnerEmail = updateStoreForChannelPartnerEmail;
const updateStoreForChannelPartnerId = (storeData, channelPartnerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channelPartner = yield prisma.channelPartner.findFirst({
            where: {
                id: channelPartnerId
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
            },
            select: {
                id: true,
                channelPartnerId: true,
                name: true,
                slug: true
            }
        });
        return { status: true, data: updatedStore };
    }
    catch (error) {
        console.error('Error Finding stores:', error);
        return { status: false, error: error };
    }
});
exports.updateStoreForChannelPartnerId = updateStoreForChannelPartnerId;
const deleteStoreById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.store.delete({
            where: {
                id: id
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Deleting store:', error);
        return { status: false, error: error };
    }
});
exports.deleteStoreById = deleteStoreById;
