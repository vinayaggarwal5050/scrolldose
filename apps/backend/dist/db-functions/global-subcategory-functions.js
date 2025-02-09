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
exports.deleteGlobalSubCategoryById = exports.updateGlobalSubCategoryforId = exports.getGlobalSubCategoryForGlobalCategoryId = exports.getGlobalSubCategoryByGlobalSubCategoryId = exports.getAllGlobalSubCategories = exports.createGlobalSubCategory = void 0;
const signelton_1 = require("./signelton");
const prisma = (0, signelton_1.getPrismaClient)();
const createGlobalSubCategory = (data, globalCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield prisma.globalSubCategory.create({
            data: {
                name: data.name,
                slug: data === null || data === void 0 ? void 0 : data.slug,
                globalCategory: {
                    connect: {
                        id: globalCategoryId
                    }
                }
            },
            select: {
                id: true,
                name: true,
                slug: true,
                globalCategoryId: true
            }
        });
        return { status: true, data: res };
    }
    catch (error) {
        console.error("Error Creating Global Sub Category:", error);
        return { status: false, error: "An error occurred while creating Global Sub Category" };
    }
});
exports.createGlobalSubCategory = createGlobalSubCategory;
const getAllGlobalSubCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield prisma.globalSubCategory.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                globalCategoryId: true
            }
        });
        return { status: true, data: res };
    }
    catch (error) {
        console.error('Error fetching Global Sub Categories:', error);
        return { status: false, error: 'Error fetching Global Sub Categories' };
    }
});
exports.getAllGlobalSubCategories = getAllGlobalSubCategories;
const getGlobalSubCategoryByGlobalSubCategoryId = (globalSubCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.globalSubCategory.findFirst({
            where: {
                id: globalSubCategoryId
            },
            select: {
                id: true,
                name: true,
                slug: true,
                globalCategoryId: true
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Fetching Global Sub Category:', error);
        return { status: false, error: 'Error fetching Global Sub Category' };
    }
});
exports.getGlobalSubCategoryByGlobalSubCategoryId = getGlobalSubCategoryByGlobalSubCategoryId;
const getGlobalSubCategoryForGlobalCategoryId = (globalCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.globalSubCategory.findMany({
            where: {
                globalCategoryId: globalCategoryId
            },
            select: {
                id: true,
                name: true,
                slug: true,
                globalCategoryId: true
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Fetching Global Sub Category:', error);
        return { status: false, error: 'Error fetching Global Sub Category' };
    }
});
exports.getGlobalSubCategoryForGlobalCategoryId = getGlobalSubCategoryForGlobalCategoryId;
const updateGlobalSubCategoryforId = (data, globalSubCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.globalSubCategory.update({
            where: {
                id: globalSubCategoryId
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
exports.updateGlobalSubCategoryforId = updateGlobalSubCategoryforId;
const deleteGlobalSubCategoryById = (globalSubCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.globalSubCategory.delete({
            where: {
                id: globalSubCategoryId
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Deleting Global Sub Category:', error);
        return { status: false, error: error };
    }
});
exports.deleteGlobalSubCategoryById = deleteGlobalSubCategoryById;
