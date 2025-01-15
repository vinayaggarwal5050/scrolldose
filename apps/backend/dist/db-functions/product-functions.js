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
exports.deleteproductByProductId = exports.updateProductByProductId = exports.getproductByChannelPartnerId = exports.getProductsByStoreName = exports.getProductsByStoreSlug = exports.getProductsByStoreId = exports.getProductByProductId = exports.getAllProducts = exports.createProductForStoreId = void 0;
const signelton_1 = require("./signelton");
const prisma = (0, signelton_1.getPrismaClient)();
const createProductForStoreId = (productData, storeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.product.create({
            data: {
                name: productData.name,
                description: productData === null || productData === void 0 ? void 0 : productData.description,
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
        return response;
    }
    catch (error) {
        console.error('Error creating product:', error);
        return error;
    }
});
exports.createProductForStoreId = createProductForStoreId;
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.product.findMany({
            select: {
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
        return response;
    }
    catch (error) {
        console.error('Error fetching products:', error);
        return error;
    }
});
exports.getAllProducts = getAllProducts;
const getProductByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.product.findFirst({
            where: {
                id: productId
            },
            select: {
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
        return response;
    }
    catch (error) {
        console.error('Error Finding products:', error);
        return error;
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
        return response;
    }
    catch (error) {
        console.error('Error Finding products:', error);
        return error;
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
        return response;
    }
    catch (error) {
        console.error('Error Finding products:', error);
        return error;
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
        return response;
    }
    catch (error) {
        console.error('Error Finding products:', error);
        return error;
    }
});
exports.getProductsByStoreName = getProductsByStoreName;
const getproductByChannelPartnerId = (channelPartnerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.store.findFirst({
            where: {
                channelPartnerId: channelPartnerId
            },
            include: {
                products: true
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error Finding products:', error);
        return error;
    }
});
exports.getproductByChannelPartnerId = getproductByChannelPartnerId;
const updateProductByProductId = (data, productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.product.update({
            where: {
                id: productId
            },
            data: {
                name: data === null || data === void 0 ? void 0 : data.name,
                description: data === null || data === void 0 ? void 0 : data.description,
                price: data === null || data === void 0 ? void 0 : data.price,
                image: data === null || data === void 0 ? void 0 : data.image,
                slug: data === null || data === void 0 ? void 0 : data.image,
                link: data === null || data === void 0 ? void 0 : data.link,
                video: data === null || data === void 0 ? void 0 : data.link,
                tag: data === null || data === void 0 ? void 0 : data.tag
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error Updaing products:', error);
        return error;
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
    }
    catch (error) {
        console.error('Error Deleting product:', error);
        return error;
    }
});
exports.deleteproductByProductId = deleteproductByProductId;
