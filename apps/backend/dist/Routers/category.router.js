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
exports.categoryRouter = void 0;
const express_1 = require("express");
const categories_function_1 = require("../db-functions/categories-function");
exports.categoryRouter = (0, express_1.Router)();
exports.categoryRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/category
    //http://localhost:5000/api/v1/category?categoryid=1
    //http://localhost:5000/api/v1/category?storeid=3
    //http://localhost:5000/api/v1/category?channelpartnerid=4
    const categoryId = parseInt(req.query.categoryid);
    const storeId = parseInt(req.query.storeid);
    const channelPartnerId = parseInt(req.query.channelpartnerid);
    let response;
    try {
        if (categoryId) {
            response = yield (0, categories_function_1.getCategoryByCategoryId)(categoryId);
        }
        else if (storeId) {
            response = yield (0, categories_function_1.getCategoryByStoreId)(storeId);
        }
        else if (channelPartnerId) {
            response = yield (0, categories_function_1.getCategoriesByChannelPartnerId)(categoryId);
        }
        else {
            response = yield (0, categories_function_1.getAllCategories)();
        }
        if (response.status) {
            res.status(200).json({
                status: true,
                data: response === null || response === void 0 ? void 0 : response.data,
                msg: "category Information Fetched Successfully",
                msgFrom: "/api/v1/category"
            });
        }
        else {
            res.status(200).json({
                status: false,
                error: response === null || response === void 0 ? void 0 : response.error,
                msg: "category Information Fetched Successfully",
                msgFrom: "/api/v1/category"
            });
        }
    }
    catch (_a) {
        res.status(200).json({
            status: false,
            msg: "Some Database Error",
            msgFrom: "/api/v1/category"
        });
    }
}));
exports.categoryRouter.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/category/create?storeid=1
    const storeId = parseInt(req.query.storeid);
    const categoryData = req.body;
    try {
        const response = yield (0, categories_function_1.createCategoryForStoreId)(categoryData, storeId);
        if (response.status) {
            res.status(200).json({
                status: true,
                data: response === null || response === void 0 ? void 0 : response.data,
                msg: "Category Created succesfully",
                msgFrom: "/api/v1/category/create"
            });
        }
        else {
            res.status(200).json({
                status: false,
                error: response === null || response === void 0 ? void 0 : response.error,
                msg: "Failed to Create Category",
                msgFrom: "/api/v1/category/create"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "Failed to create category",
            msgFrom: "/api/v1/category/create",
            error: error
        });
    }
}));
exports.categoryRouter.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/category/update?categoryid=3
    try {
        const categoryId = parseInt(req.query.categoryid);
        const categoryData = req.body;
        if (categoryId) {
            const response = yield (0, categories_function_1.updateCategoryByCategoryId)(categoryData, categoryId);
            if (response.status) {
                res.status(200).json({
                    status: true,
                    data: response === null || response === void 0 ? void 0 : response.data,
                    msg: "Category Updated succesfully",
                    msgFrom: "/api/v1/category/update?categoryid"
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    error: response === null || response === void 0 ? void 0 : response.error,
                    msg: "Failed to update Category",
                    msgFrom: "/api/v1/category/update?categoryid"
                });
            }
        }
        else {
            res.status(200).json({
                status: false,
                msg: "invalid input",
                msgFrom: "/api/v1/category/update?categoryid"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some database error",
            error: error,
            msgFrom: "/api/v1/category/update?categoryid"
        });
    }
}));
exports.categoryRouter.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/category/update?categoryid=3
    try {
        const categoryId = parseInt(req.query.categoryid);
        if (categoryId) {
            const response = yield (0, categories_function_1.deleteCategoryByCategoryId)(categoryId);
            if (response.status) {
                res.status(200).json({
                    status: true,
                    data: response === null || response === void 0 ? void 0 : response.data,
                    msg: "Category deleted succesfully",
                    msgFrom: "/api/v1/cateogry/delete?categoryid"
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    error: response === null || response === void 0 ? void 0 : response.error,
                    msg: "Failed to delete Category",
                    msgFrom: "/api/v1/cateogry/delete?categoryid"
                });
            }
        }
        else {
            res.json({
                status: "false",
                msg: "invalid inputs",
                msgFrom: "/api/v1/cateogry/delete?categoryid"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some database error",
            error: error,
            msgFrom: "/api/v1/cateogry/delete?categoryid"
        });
    }
}));
