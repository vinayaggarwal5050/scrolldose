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
exports.deleteGlobalCategoryById = exports.updateGlobalCategoryforId = exports.getGlobalCategoryByGlobalCategoryId = exports.getAllGloalCategories = exports.createGlobalCategory = void 0;
const signelton_1 = require("./signelton");
const prisma = (0, signelton_1.getPrismaClient)();
const createGlobalCategory = (globalCategoryData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield prisma.globalCategory.create({
            data: {
                name: globalCategoryData.name,
                slug: globalCategoryData === null || globalCategoryData === void 0 ? void 0 : globalCategoryData.slug
            },
            select: {
                id: true,
                name: true,
                slug: true,
                globalSubCategories: true
            }
        });
        return { status: true, data: res };
    }
    catch (error) {
        console.error("Error Creating Global Category:", error);
        return { status: false, error: "An error occurred while creating Global Category" };
    }
});
exports.createGlobalCategory = createGlobalCategory;
const getAllGloalCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield prisma.globalCategory.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                globalSubCategories: true
            }
        });
        return { status: true, data: res };
    }
    catch (error) {
        console.error('Error fetching Global Categories:', error);
        return { status: false, error: 'Error fetching Global Categories' };
    }
});
exports.getAllGloalCategories = getAllGloalCategories;
const getGlobalCategoryByGlobalCategoryId = (globalCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.globalCategory.findFirst({
            where: {
                id: globalCategoryId
            },
            select: {
                id: true,
                name: true,
                slug: true,
                globalSubCategories: true
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Fetching Global Category:', error);
        return { status: false, error: 'Error fetching Global Categories' };
    }
});
exports.getGlobalCategoryByGlobalCategoryId = getGlobalCategoryByGlobalCategoryId;
const updateGlobalCategoryforId = (data, globalCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.globalCategory.update({
            where: {
                id: globalCategoryId
            },
            data: {
                name: data === null || data === void 0 ? void 0 : data.name,
                slug: data === null || data === void 0 ? void 0 : data.slug
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Updating Global Category:', error);
        return { status: false, error: error };
    }
});
exports.updateGlobalCategoryforId = updateGlobalCategoryforId;
const deleteGlobalCategoryById = (globalCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.globalCategory.delete({
            where: {
                id: globalCategoryId
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Deleting Global Category:', error);
        return { status: false, error: error };
    }
});
exports.deleteGlobalCategoryById = deleteGlobalCategoryById;
