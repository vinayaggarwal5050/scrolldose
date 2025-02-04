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
exports.deleteChannelPartnerByEmail = exports.deleteChannelPartnerById = exports.updateChannelPartnerforId = exports.updateChannelPartnerforEmail = exports.getChannelPartnerById = exports.getChannelPartnerByEmail = exports.getAllChannelPartners = exports.createChannelPartner = void 0;
const signelton_1 = require("./signelton");
const prisma = (0, signelton_1.getPrismaClient)();
const createChannelPartner = (channelPartnerData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if email already exists
        const existingPartner = yield prisma.channelPartner.findUnique({
            where: { email: channelPartnerData.email },
        });
        if (existingPartner) {
            return { status: false, error: "Email already exists" };
        }
        // Create a new channel partner if email does not exist
        const response = yield prisma.channelPartner.create({
            data: {
                email: channelPartnerData.email,
                password: channelPartnerData.password,
                name: channelPartnerData === null || channelPartnerData === void 0 ? void 0 : channelPartnerData.name,
            },
            select: {
                id: true,
                email: true,
                password: true,
                name: true,
                role: true,
                createdAt: true,
                store: true
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error("Error creating channelPartner:", error);
        return { status: false, error: "An error occurred while creating channel partner" };
    }
});
exports.createChannelPartner = createChannelPartner;
const getAllChannelPartners = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.channelPartner.findMany({
            select: {
                id: true,
                email: true,
                password: true,
                name: true,
                role: true,
                createdAt: true,
                store: true
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error fetching channelPartners:', error);
        return { status: false, error: error };
    }
});
exports.getAllChannelPartners = getAllChannelPartners;
const getChannelPartnerByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.channelPartner.findFirst({
            where: {
                email: email
            },
            select: {
                id: true,
                email: true,
                password: true,
                name: true,
                role: true,
                createdAt: true,
                store: true
            }
        });
        return { status: true, data: response };
        ;
    }
    catch (error) {
        console.error('Error Finding channelPartners:', error);
        return { status: false, error: error };
    }
});
exports.getChannelPartnerByEmail = getChannelPartnerByEmail;
const getChannelPartnerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.channelPartner.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                password: true,
                name: true,
                role: true,
                createdAt: true,
                store: true
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Finding channelPartners:', error);
        return { status: false, error: error };
    }
});
exports.getChannelPartnerById = getChannelPartnerById;
const updateChannelPartnerforEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.channelPartner.update({
            where: {
                email: data === null || data === void 0 ? void 0 : data.email
            },
            data: {
                password: data === null || data === void 0 ? void 0 : data.password,
                name: data === null || data === void 0 ? void 0 : data.name
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Updating channelPartner:', error);
        return { status: false, error: error };
    }
});
exports.updateChannelPartnerforEmail = updateChannelPartnerforEmail;
const updateChannelPartnerforId = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.channelPartner.update({
            where: {
                id: data === null || data === void 0 ? void 0 : data.id
            },
            data: {
                email: data === null || data === void 0 ? void 0 : data.email,
                password: data === null || data === void 0 ? void 0 : data.password,
                name: data === null || data === void 0 ? void 0 : data.name
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Updating channelPartner:', error);
        return { status: false, error: error };
    }
});
exports.updateChannelPartnerforId = updateChannelPartnerforId;
const deleteChannelPartnerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.channelPartner.delete({
            where: {
                id: id
            }
        });
    }
    catch (error) {
        console.error('Error selecting channelPartner:', error);
        return error;
    }
});
exports.deleteChannelPartnerById = deleteChannelPartnerById;
const deleteChannelPartnerByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.channelPartner.delete({
            where: {
                email: email
            }
        });
    }
    catch (error) {
        console.error('Error selecting channelPartner:', error);
        return error;
    }
});
exports.deleteChannelPartnerByEmail = deleteChannelPartnerByEmail;
