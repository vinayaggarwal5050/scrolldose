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
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/product
    //http://localhost:6000/api/v1/product?storeid=3
    //http://localhost:6000/api/v1/product?channelpartneremail=superadmin@gmail.com
    //http://localhost:6000/api/v1/product?channelpartnerid=2
    const productId = parseInt(req.query.productid);
    const storeId = parseInt(req.query.storeid);
    const storeName = req.query.storename;
    const storeSlug = req.query.storeslug;
    const channelPartnerId = parseInt(req.query.channelpartnerid);
    let data;
    if (productId) {
        data = yield (0, product_functions_1.getProductByProductId)(productId);
    }
    else if (storeId) {
        data = yield (0, product_functions_1.getProductsByStoreId)(storeId);
    }
    else if (storeName) {
        data = yield (0, product_functions_1.getProductsByStoreName)(storeName);
    }
    else if (storeSlug) {
        data = yield (0, product_functions_1.getProductsByStoreSlug)(storeSlug);
    }
    else if (channelPartnerId) {
        data = yield (0, product_functions_1.getproductsByChannelPartnerId)(channelPartnerId);
    }
    else {
        data = yield (0, product_functions_1.getAllProducts)();
    }
    res.status(200).json({
        status: true,
        data: data,
        msg: "/api/v1/products"
    });
}));
exports.productRouter.get('/range', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const startIndex = parseInt(req.query.startindex);
    const endIndex = parseInt(req.query.endindex);
    const limit = parseInt(req.query.limit);
    if (startIndex && endIndex && limit) {
        try {
            const data = yield (0, product_functions_1.getProductsByRange)(startIndex, endIndex, limit);
            res.status(200).json({
                status: true,
                data: data,
                msg: "/api/v1/products/range"
            });
        }
        catch (err) {
            res.status(200).json({
                status: false,
                msg: "some database error",
                msgFrom: "/api/v1/products/range"
            });
        }
    }
    else {
        res.status(200).json({
            status: true,
            msg: "parameters missing",
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
            const data = yield (0, product_functions_1.getProductsByRangeAndUserId)(startIndex, endIndex, limit, userId);
            res.status(200).json({
                status: true,
                data: data,
                msg: "/api/v1/products/user-range"
            });
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
            status: true,
            msg: "parameters missing",
            msgFrom: "/api/v1/products/user-range"
        });
    }
}));
exports.productRouter.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/product/create?storeid=1
    const storeId = parseInt(req.query.storeid);
    const productData = req.body;
    try {
        const data = yield (0, product_functions_1.createProductForStoreId)(productData, storeId);
        res.status(200).json({
            status: true,
            data: data,
            msg: "/api/v1/product/create"
        });
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some error",
            error: error
        });
    }
}));
exports.productRouter.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/product/update?productid=3
    try {
        const productId = parseFloat(req.query.productid);
        const productData = req.body;
        if (productId) {
            const data = yield (0, product_functions_1.updateProductByProductId)(productData, productId);
            res.status(200).json({
                status: "true",
                data: data,
                msg: "api/v1/product/update?productid"
            });
        }
        else {
            res.status(200).json({
                status: false,
                msg: "invalid input"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some error",
            error: error
        });
    }
}));
exports.productRouter.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/product/delete?productid=4
    try {
        const productId = parseInt(req.query.productid);
        const data = yield (0, product_functions_1.deleteproductByProductId)(productId);
        if (productId) {
            res.status(200).json({
                status: "true",
                data: data,
                msg: "api/v1/product/delete?productid="
            });
        }
        else {
            res.json({
                status: "false",
                msg: "invalid data"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some error",
            error: error
        });
    }
}));
