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
exports.productRouter = void 0;
const express_1 = require("express");
const product_functions_1 = require("../db-functions/product-functions");
const product_mw_1 = require("./middlewares/product.mw");
// import { validateCreateProduct } from "./middlewares/product.mw";
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/product
    //http://localhost:5000/api/v1/product?productid=3
    //http://localhost:5000/api/v1/product?categoryid=1
    //http://localhost:5000/api/v1/product?globalsubcategoryid=1
    //http://localhost:5000/api/v1/product?storeid=3
    //http://localhost:5000/api/v1/product?storeslug=my-store
    const productId = parseInt(req.query.productid);
    const categoryId = parseInt(req.query.categoryid);
    const globalSubCategoryId = parseInt(req.query.globalsubcategoryid);
    const storeId = parseInt(req.query.storeid);
    const storeSlug = req.query.storeslug;
    let response;
    try {
        if (productId) {
            response = yield (0, product_functions_1.getProductByProductId)(productId);
        }
        else if (storeId) {
            response = yield (0, product_functions_1.getProductsByStoreId)(storeId);
        }
        else if (categoryId) {
            response = yield (0, product_functions_1.getProductsByCategoryId)(categoryId);
        }
        else if (globalSubCategoryId) {
            response = yield (0, product_functions_1.getProductsByGlobalSubCategoryId)(globalSubCategoryId);
        }
        else if (storeSlug) {
            response = yield (0, product_functions_1.getProductsByStoreSlug)(storeSlug);
        }
        else {
            response = yield (0, product_functions_1.getAllProducts)();
        }
        if (response.status) {
            res.status(200).json({
                status: true,
                data: response === null || response === void 0 ? void 0 : response.data,
                msg: "Product Information Fetched Successfully",
                msgFrom: "/api/v1/product"
            });
        }
        else {
            res.status(200).json({
                status: false,
                error: response === null || response === void 0 ? void 0 : response.error,
                msg: "Product Information Fetched Successfully",
                msgFrom: "/api/v1/product"
            });
        }
    }
    catch (_a) {
        res.status(200).json({
            status: false,
            msg: "Some Database Error",
            msgFrom: "/api/v1/product"
        });
    }
}));
exports.productRouter.get('/range', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const startIndex = parseInt(req.query.startindex);
    const endIndex = parseInt(req.query.endindex);
    const limit = parseInt(req.query.limit);
    const globalSubCategoryId = parseInt(req.query.globalSubCategoryId);
    try {
        let response;
        if (startIndex && endIndex && limit) {
            response = yield (0, product_functions_1.getProductsByRange)(startIndex, endIndex, limit);
        }
        else if (startIndex && endIndex && limit && globalSubCategoryId) {
            response = yield (0, product_functions_1.getProductsByRangeForSubCategoryId)(startIndex, endIndex, limit, globalSubCategoryId);
        }
        else {
            res.status(200).json({
                status: false,
                msg: "invalid inputs",
                msgFrom: "/api/v1/products/range"
            });
        }
        if (response === null || response === void 0 ? void 0 : response.status) {
            res.status(200).json({
                status: true,
                data: response === null || response === void 0 ? void 0 : response.data,
                msg: "Product fetched succesfully",
                msgFrom: "/api/v1/products/range"
            });
        }
        else {
            res.status(200).json({
                status: false,
                error: response === null || response === void 0 ? void 0 : response.error,
                msg: "Product fetched succesfully",
                msgFrom: "/api/v1/products/range"
            });
        }
    }
    catch (err) {
        res.status(200).json({
            status: false,
            msg: "some database error",
            msgFrom: "/api/v1/products/range"
        });
    }
}));
exports.productRouter.get('/user-range', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const startIndex = parseInt(req.query.startindex);
    const endIndex = parseInt(req.query.endindex);
    const limit = parseInt(req.query.limit);
    const userId = parseInt(req.query.userid);
    if (startIndex && endIndex && limit && userId) {
        try {
            const response = yield (0, product_functions_1.getProductsByRangeAndUserId)(startIndex, endIndex, limit, userId);
            if (response.status) {
                res.status(200).json({
                    status: true,
                    data: response === null || response === void 0 ? void 0 : response.data,
                    msg: "Product fetched succesfully",
                    msgFrom: "/api/v1/products/range"
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    error: response === null || response === void 0 ? void 0 : response.error,
                    msg: "Product fetched succesfully",
                    msgFrom: "/api/v1/products/range"
                });
            }
        }
        catch (err) {
            res.status(200).json({
                status: false,
                msg: "some database error",
                msgFrom: "/api/v1/products/user-range"
            });
        }
    }
    else {
        res.status(200).json({
            status: false,
            msg: "invalid inputs",
            msgFrom: "/api/v1/products/range"
        });
    }
}));
exports.productRouter.post("/create", product_mw_1.upload.single("mainImage"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).json({ error: "Image is required" });
    }
    let productData = req.body;
    const { categoryId, globalSubCategoryId, name, slug, price, videoId, stock, isAffiliateLink } = productData;
    const mainImageUrl = `/uploaded-product-images/${req.file.filename}`;
    productData = Object.assign(Object.assign({}, productData), { "categoryId": parseInt(categoryId), "globalSubCategoryId": parseInt(globalSubCategoryId), "videoId": parseInt(videoId), "price": parseInt(price), "stock": parseInt(stock), "isAffiliateLink": (isAffiliateLink === 'true') ? true : false, "mainImageUrl": mainImageUrl });
    console.log(productData);
    if (categoryId && globalSubCategoryId && name && slug) {
        try {
            const response = yield (0, product_functions_1.createProductForCategoryIdAndGlobalSubCategoryId)(productData);
            if (response === null || response === void 0 ? void 0 : response.status) {
                res.status(200).json({
                    status: true,
                    data: response === null || response === void 0 ? void 0 : response.data,
                    msg: "Product Created succesfully",
                    msgFrom: "/api/v1/product/create"
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    error: response === null || response === void 0 ? void 0 : response.error,
                    msg: "Failed to Create Product",
                    msgFrom: "/api/v1/product/create"
                });
            }
        }
        catch (error) {
            res.status(200).json({
                status: false,
                msg: "Some database error",
                msgFrom: "/api/v1/product/create",
                error: error
            });
        }
    }
    else {
        res.status(200).json({
            status: false,
            msg: "invalid inputs",
            msgFrom: "/api/v1/product/create",
        });
    }
}));
exports.productRouter.post("/upload", product_mw_1.upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "otherImages", maxCount: 5 }
]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files.mainImage || req.files.mainImage.length === 0) {
        return res.status(200).json({
            status: false,
            message: "Main Image is required",
            msgFrom: "/api/v1/product/upload"
        });
    }
    let productData = req.body;
    const { categoryId, globalSubCategoryId, name, slug, price, videoId, stock, isAffiliateLink } = productData;
    const mainImageUrl = `/uploaded-product-images/${req.files.mainImage[0].filename}`;
    const otherImagesUrls = req.files.otherImages
        ? req.files.otherImages.map((file) => `/uploaded-product-images/${file.filename}`)
        : [];
    productData = Object.assign(Object.assign({}, productData), { "categoryId": parseInt(categoryId), "globalSubCategoryId": parseInt(globalSubCategoryId), "videoId": parseInt(videoId), "price": parseInt(price), "stock": parseInt(stock), "isAffiliateLink": (isAffiliateLink === 'true') ? true : false, "mainImageUrl": mainImageUrl, "otherImagesUrls": otherImagesUrls });
    console.log(productData);
    if (categoryId && globalSubCategoryId && name && slug) {
        try {
            const response = yield (0, product_functions_1.createProductForCategoryIdAndGlobalSubCategoryId)(productData);
            if (response === null || response === void 0 ? void 0 : response.status) {
                res.status(200).json({
                    status: true,
                    data: response === null || response === void 0 ? void 0 : response.data,
                    msg: "Product Created succesfully",
                    msgFrom: "/api/v1/product/create"
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    error: response === null || response === void 0 ? void 0 : response.error,
                    msg: "Failed to Create Product",
                    msgFrom: "/api/v1/product/create"
                });
            }
        }
        catch (error) {
            res.status(200).json({
                status: false,
                msg: "Some database error",
                msgFrom: "/api/v1/product/create",
                error: error
            });
        }
    }
    else {
        res.status(200).json({
            status: false,
            msg: "invalid inputs",
            msgFrom: "/api/v1/product/create",
        });
    }
}));
exports.productRouter.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/product/update?productid=3
    try {
        const productId = parseInt(req.query.productid);
        const productData = req.body;
        if (productId) {
            const response = yield (0, product_functions_1.updateProductByProductId)(productData, productId);
            if (response.status) {
                res.status(200).json({
                    status: true,
                    data: response === null || response === void 0 ? void 0 : response.data,
                    msg: "Product Updated succesfully",
                    msgFrom: "/api/v1/product/update?productid"
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    error: response === null || response === void 0 ? void 0 : response.error,
                    msg: "Failed to update Product",
                    msgFrom: "/api/v1/product/update?productid"
                });
            }
        }
        else {
            res.status(200).json({
                status: false,
                msg: "invalid input",
                msgFrom: "/api/v1/product/update"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some database error",
            error: error,
            msgFrom: "/api/v1/product/update"
        });
    }
}));
exports.productRouter.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/product/delete?productid=4
    try {
        const productId = parseInt(req.query.productid);
        if (productId) {
            const response = yield (0, product_functions_1.deleteproductByProductId)(productId);
            if (response.status) {
                res.status(200).json({
                    status: true,
                    data: response === null || response === void 0 ? void 0 : response.data,
                    msg: "Product deleted succesfully",
                    msgFrom: "/api/v1/product/delete?productid"
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    error: response === null || response === void 0 ? void 0 : response.error,
                    msg: "Failed to delete Product",
                    msgFrom: "/api/v1/product/delete?productid"
                });
            }
        }
        else {
            res.json({
                status: "false",
                msg: "invalid inputs",
                msgFrom: "/api/v1/product/delete"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some database error",
            error: error,
            msgFrom: "/api/v1/product/delete"
        });
    }
}));
