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
exports.deleteproductByProductId = exports.updateProductByProductId = exports.getproductsByChannelPartnerId = exports.getProductsByStoreName = exports.getProductsByStoreSlug = exports.getProductsByStoreId = exports.getProductByProductId = exports.getProductsByRangeAndUserId = exports.getProductsByRange = exports.getAllProducts = exports.createProductForStoreId = void 0;
const signelton_1 = require("./signelton");
const prisma = (0, signelton_1.getPrismaClient)();
const createProductForStoreId = (productData, storeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.product.create({
            data: {
                name: productData.name,
                description: productData === null || productData === void 0 ? void 0 : productData.description,
                category: productData === null || productData === void 0 ? void 0 : productData.category,
                price: productData === null || productData === void 0 ? void 0 : productData.price,
                image: productData === null || productData === void 0 ? void 0 : productData.image,
                link: productData === null || productData === void 0 ? void 0 : productData.link,
                slug: productData === null || productData === void 0 ? void 0 : productData.slug,
                video: productData === null || productData === void 0 ? void 0 : productData.video,
                tag: productData === null || productData === void 0 ? void 0 : productData.tag,
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
        console.error('Error creating product:', error);
        return { status: false, error: error };
    }
});
exports.createProductForStoreId = createProductForStoreId;
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                image: true,
                link: true,
                slug: true,
                video: true,
                tag: true,
                createdAt: true,
                lastUpdate: true,
                storeId: true
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
                description: true,
                price: true,
                image: true,
                link: true,
                slug: true,
                video: true,
                tag: true,
                createdAt: true,
                lastUpdate: true,
                storeId: true
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
const getProductsByStoreId = (storeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.product.findMany({
            where: {
                storeId: storeId
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Finding products:', error);
        return { status: false, error: error };
    }
});
exports.getProductsByStoreId = getProductsByStoreId;
const getProductsByStoreSlug = (StoreSlug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.store.findFirst({
            where: {
                slug: StoreSlug
            },
            include: {
                products: true
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Finding products:', error);
        return { status: false, error: error };
    }
});
exports.getProductsByStoreSlug = getProductsByStoreSlug;
const getProductsByStoreName = (StoreName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.store.findFirst({
            where: {
                name: StoreName
            },
            include: {
                products: true
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Finding products:', error);
        return { status: false, error: error };
    }
});
exports.getProductsByStoreName = getProductsByStoreName;
const getproductsByChannelPartnerId = (channelPartnerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield prisma.store.findFirst({
            where: {
                channelPartnerId: channelPartnerId
            }
        });
        if (!store) {
            return "no store exists for this channel partner id";
        }
        const response = yield prisma.product.findMany({
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
exports.getproductsByChannelPartnerId = getproductsByChannelPartnerId;
const updateProductByProductId = (data, productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.product.update({
            where: {
                id: productId
            },
            data: {
                name: data === null || data === void 0 ? void 0 : data.name,
                description: data === null || data === void 0 ? void 0 : data.description,
                category: data === null || data === void 0 ? void 0 : data.category,
                price: data === null || data === void 0 ? void 0 : data.price,
                image: data === null || data === void 0 ? void 0 : data.image,
                slug: data === null || data === void 0 ? void 0 : data.image,
                link: data === null || data === void 0 ? void 0 : data.link,
                video: data === null || data === void 0 ? void 0 : data.link,
                tag: data === null || data === void 0 ? void 0 : data.tag
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
