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
exports.deleteproductByProductId = exports.updateProductByProductId = exports.getProductsByStoreSlug = exports.getProductsByStoreId = exports.getProductsByCategoryId = exports.getProductByProductId = exports.getProductsByRangeAndUserId = exports.getProductsByRange = exports.getAllProducts = exports.createProductForCategoryId = void 0;
const signelton_1 = require("./signelton");
const prisma = (0, signelton_1.getPrismaClient)();
const createProductForCategoryId = (productData, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.product.create({
            data: {
                name: productData.name,
                slug: productData.slug,
                description: productData === null || productData === void 0 ? void 0 : productData.description,
                price: productData === null || productData === void 0 ? void 0 : productData.price,
                mainImageUrl: productData === null || productData === void 0 ? void 0 : productData.mainImageUrl,
                otherImagesUrl: productData === null || productData === void 0 ? void 0 : productData.otherImagesUrl,
                videoUrl: productData === null || productData === void 0 ? void 0 : productData.videoUrl,
                videoId: productData === null || productData === void 0 ? void 0 : productData.videoId,
                stock: productData === null || productData === void 0 ? void 0 : productData.stock,
                tags: productData === null || productData === void 0 ? void 0 : productData.tags,
                isAffiliateLink: productData === null || productData === void 0 ? void 0 : productData.isAffiliateLink,
                affiliateLink: productData === null || productData === void 0 ? void 0 : productData.affiliateLink,
                affiliateHost: productData === null || productData === void 0 ? void 0 : productData.affiliateHost,
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            },
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error while Creating Product:', error);
        return { status: false, error: error };
    }
});
exports.createProductForCategoryId = createProductForCategoryId;
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.product.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                price: true,
                mainImageUrl: true,
                otherImagesUrl: true,
                videoUrl: true,
                videoId: true,
                stock: true,
                tags: true,
                isAffiliateLink: true,
                affiliateLink: true,
                affiliateHost: true,
                categoryId: true
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error fetching products:', error);
        return { status: false, error: error };
    }
});
exports.getAllProducts = getAllProducts;
const getProductsByRange = (startIndex, endIndex, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.product.findMany({
            where: {
                id: {
                    gte: startIndex,
                    lte: endIndex,
                },
            },
            orderBy: {
                id: 'asc',
            },
            take: limit, // Ensures that only 'limit' products are returned
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error fetching products by range:', error);
        return { status: false, error: error };
    }
});
exports.getProductsByRange = getProductsByRange;
const getProductsByRangeAndUserId = (startIndex, endIndex, limit, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma.product.findMany({
            where: {
                id: {
                    gte: startIndex,
                    lte: endIndex,
                },
            },
            orderBy: {
                id: 'asc',
            },
            take: limit,
            include: {
                wishedByUsers: {
                    select: {
                        userId: true,
                    },
                },
            },
        });
        const result = products.map((product) => {
            return Object.assign(Object.assign({}, product), { isWishedByUser: product.wishedByUsers.some((user) => user.userId === userId) });
        });
        return { status: true, data: result };
    }
    catch (error) {
        console.error('Error fetching products by range and user ID:', error);
        return { status: false, error: error };
    }
});
exports.getProductsByRangeAndUserId = getProductsByRangeAndUserId;
const getProductByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.product.findFirst({
            where: {
                id: productId
            },
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                price: true,
                mainImageUrl: true,
                otherImagesUrl: true,
                videoUrl: true,
                videoId: true,
                stock: true,
                tags: true,
                isAffiliateLink: true,
                affiliateLink: true,
                affiliateHost: true,
                categoryId: true
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Finding products:', error);
        return { status: false, error: error };
    }
});
exports.getProductByProductId = getProductByProductId;
const getProductsByCategoryId = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.product.findMany({
            where: {
                categoryId: categoryId
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Finding products:', error);
        return { status: false, error: error };
    }
});
exports.getProductsByCategoryId = getProductsByCategoryId;
const getProductsByStoreId = (storeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prisma.category.findMany({
            where: {
                storeId: storeId
            },
            select: {
                id: true
            }
        });
        if (!categories || categories.length === 0) {
            return { status: false, message: "No Store found for this store id" };
        }
        const categoryIds = categories.map(category => category.id);
        const products = yield prisma.product.findMany({
            where: {
                categoryId: { in: categoryIds },
            },
        });
        return { status: true, data: products };
    }
    catch (error) {
        console.error('Error Finding products:', error);
        return { status: false, error: error };
    }
});
exports.getProductsByStoreId = getProductsByStoreId;
const getProductsByStoreSlug = (storeSlug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prisma.category.findMany({
            where: {
                slug: storeSlug
            },
            select: {
                id: true
            }
        });
        if (!categories || categories.length === 0) {
            return { status: false, message: "No Store found for this store id" };
        }
        const categoryIds = categories.map(category => category.id);
        const products = yield prisma.product.findMany({
            where: {
                categoryId: { in: categoryIds },
            },
        });
        return { status: true, data: products };
    }
    catch (error) {
        console.error('Error Finding products:', error);
        return { status: false, error: error };
    }
});
exports.getProductsByStoreSlug = getProductsByStoreSlug;
const updateProductByProductId = (productData, productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.product.update({
            where: {
                id: productId
            },
            data: {
                name: productData.name,
                slug: productData.slug,
                description: productData === null || productData === void 0 ? void 0 : productData.description,
                price: productData === null || productData === void 0 ? void 0 : productData.price,
                mainImageUrl: productData === null || productData === void 0 ? void 0 : productData.mainImageUrl,
                otherImagesUrl: productData === null || productData === void 0 ? void 0 : productData.otherImagesUrl,
                videoUrl: productData === null || productData === void 0 ? void 0 : productData.videoUrl,
                videoId: productData === null || productData === void 0 ? void 0 : productData.videoId,
                stock: productData === null || productData === void 0 ? void 0 : productData.stock,
                tags: productData === null || productData === void 0 ? void 0 : productData.tags,
                isAffiliateLink: productData === null || productData === void 0 ? void 0 : productData.isAffiliateLink,
                affiliateLink: productData === null || productData === void 0 ? void 0 : productData.affiliateLink,
                affiliateHost: productData === null || productData === void 0 ? void 0 : productData.affiliateHost
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Updaing products:', error);
        return { status: false, error: error };
    }
});
exports.updateProductByProductId = updateProductByProductId;
const deleteproductByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.product.delete({
            where: {
                id: productId
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Deleting product:', error);
        return { status: false, error: error };
    }
});
exports.deleteproductByProductId = deleteproductByProductId;
