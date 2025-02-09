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
exports.deleteCategoryByCategoryId = exports.updateCategoryByCategoryId = exports.getCategoriesByChannelPartnerId = exports.getCategoryByStoreId = exports.getCategoryByCategoryId = exports.getAllCategories = exports.createCategoryForStoreId = void 0;
const signelton_1 = require("./signelton");
const prisma = (0, signelton_1.getPrismaClient)();
const createCategoryForStoreId = (categoryData, storeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.category.create({
            data: {
                name: categoryData.name,
                slug: categoryData === null || categoryData === void 0 ? void 0 : categoryData.slug,
                store: {
                    connect: {
                        id: storeId
                    }
                }
            },
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error creating Category:', error);
        return { status: false, error: error };
    }
});
exports.createCategoryForStoreId = createCategoryForStoreId;
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.category.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                storeId: true
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Fetching Categories:', error);
        return { status: false, error: error };
    }
});
exports.getAllCategories = getAllCategories;
const getCategoryByCategoryId = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.category.findFirst({
            where: {
                id: categoryId
            },
            select: {
                id: true,
                name: true,
                slug: true,
                storeId: true
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Finding Category:', error);
        return { status: false, error: error };
    }
});
exports.getCategoryByCategoryId = getCategoryByCategoryId;
const getCategoryByStoreId = (storeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.category.findMany({
            where: {
                storeId: storeId
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Finding Category:', error);
        return { status: false, error: error };
    }
});
exports.getCategoryByStoreId = getCategoryByStoreId;
const getCategoriesByChannelPartnerId = (channelPartnerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield prisma.store.findFirst({
            where: {
                channelPartnerId: channelPartnerId
            }
        });
        if (!store) {
            return "no store exists for this channel partner id";
        }
        const response = yield prisma.category.findMany({
            where: {
                storeId: store.id
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Finding products:', error);
        return { status: false, error: error };
    }
});
exports.getCategoriesByChannelPartnerId = getCategoriesByChannelPartnerId;
const updateCategoryByCategoryId = (data, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.category.update({
            where: {
                id: categoryId
            },
            data: {
                name: data === null || data === void 0 ? void 0 : data.name,
                slug: data === null || data === void 0 ? void 0 : data.slug,
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Updaing Category:', error);
        return { status: false, error: error };
    }
});
exports.updateCategoryByCategoryId = updateCategoryByCategoryId;
const deleteCategoryByCategoryId = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.product.delete({
            where: {
                id: categoryId
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Deleting Category:', error);
        return { status: false, error: error };
    }
});
exports.deleteCategoryByCategoryId = deleteCategoryByCategoryId;
