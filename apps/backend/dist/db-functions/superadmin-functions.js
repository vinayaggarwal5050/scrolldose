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
exports.deleteSuperUserByEmail = exports.deleteSuperUserById = exports.updateSuperadmintforId = exports.updateSuperadmintforEmail = exports.getSuperadminById = exports.getSuperadminByEmail = exports.getAllSuperadmin = exports.createSuperadmin = void 0;
const signelton_1 = require("./signelton");
const prisma = (0, signelton_1.getPrismaClient)();
const createSuperadmin = (superadminData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.superadmin.create({
            data: {
                email: superadminData.email,
                password: superadminData.password,
                name: superadminData === null || superadminData === void 0 ? void 0 : superadminData.name
            },
        });
        return response;
    }
    catch (error) {
        console.error('Error creating Superadmin:', error);
        return error;
    }
});
exports.createSuperadmin = createSuperadmin;
const getAllSuperadmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.superadmin.findMany({
            select: {
                id: true,
                email: true,
                password: true,
                name: true,
                role: true,
                createdAt: true
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error fetching Superadmins:', error);
        return error;
    }
});
exports.getAllSuperadmin = getAllSuperadmin;
const getSuperadminByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.superadmin.findFirst({
            where: {
                email: email
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error Finding Superadmins:', error);
        return error;
    }
});
exports.getSuperadminByEmail = getSuperadminByEmail;
const getSuperadminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.superadmin.findFirst({
            where: {
                id: id
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error Finding Superadmins:', error);
        return error;
    }
});
exports.getSuperadminById = getSuperadminById;
const updateSuperadmintforEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.superadmin.update({
            where: {
                email: data === null || data === void 0 ? void 0 : data.email
            },
            data: {
                password: data === null || data === void 0 ? void 0 : data.password,
                name: data === null || data === void 0 ? void 0 : data.name
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error Updating Superadmin:', error);
        return error;
    }
});
exports.updateSuperadmintforEmail = updateSuperadmintforEmail;
const updateSuperadmintforId = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.superadmin.update({
            where: {
                id: data === null || data === void 0 ? void 0 : data.id
            },
            data: {
                email: data === null || data === void 0 ? void 0 : data.email,
                password: data === null || data === void 0 ? void 0 : data.password,
                name: data === null || data === void 0 ? void 0 : data.name
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error Updating Superadmin:', error);
        return error;
    }
});
exports.updateSuperadmintforId = updateSuperadmintforId;
const deleteSuperUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.superadmin.delete({
            where: {
                id: id
            }
        });
    }
    catch (error) {
        console.error('Error selecting Superadmin:', error);
        return error;
    }
});
exports.deleteSuperUserById = deleteSuperUserById;
const deleteSuperUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.superadmin.delete({
            where: {
                email: email
            }
        });
    }
    catch (error) {
        console.error('Error selecting Superadmin:', error);
        return error;
    }
});
exports.deleteSuperUserByEmail = deleteSuperUserByEmail;
