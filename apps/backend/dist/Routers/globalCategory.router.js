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
exports.globalCategoryRouter = void 0;
const express_1 = require("express");
const global_category_functions_1 = require("../db-functions/global-category-functions");
exports.globalCategoryRouter = (0, express_1.Router)();
exports.globalCategoryRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/global-category
    //http://localhost:5000/api/v1/global-category?id=3
    const globalCategoryId = parseInt(req.query.id);
    let response;
    try {
        if (globalCategoryId) {
            response = yield (0, global_category_functions_1.getGlobalCategoryByGlobalCategoryId)(globalCategoryId);
        }
        else {
            response = yield (0, global_category_functions_1.getAllGloalCategories)();
        }
        if (response.status) {
            res.status(200).json({
                status: true,
                data: response.data,
                msg: "Global Category fetched succefully",
                msgFrom: "/api/v1/global-category"
            });
        }
        else {
            res.status(200).json({
                status: false,
                msg: "Error Finding globalCategorys",
                error: response === null || response === void 0 ? void 0 : response.error,
                msgFrom: "/api/v1/global-category/create"
            });
        }
    }
    catch (error) {
        res.json({
            status: false,
            msg: "database error",
            msgFrom: "/api/v1/global-category"
        });
    }
}));
exports.globalCategoryRouter.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/global-category/create
    try {
        const response = yield (0, global_category_functions_1.createGlobalCategory)(req.body);
        if (response === null || response === void 0 ? void 0 : response.status) {
            res.status(200).json({
                status: true,
                data: response === null || response === void 0 ? void 0 : response.data,
                msg: "Global Category Created Successfully",
                msgFrom: "/api/v1/global-category/create"
            });
        }
        else {
            res.status(200).json({
                status: false,
                msg: "Error While creating Global Category",
                error: response === null || response === void 0 ? void 0 : response.error,
                msgFrom: "/api/v1/global-category/create"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some Database Error",
            msgFrom: "/api/v1/global-category/create",
            error: error
        });
    }
}));
exports.globalCategoryRouter.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/global-category/update?id=3
    try {
        const globalCategoryId = parseInt(req.query.id);
        const data = req.body;
        let response;
        if (globalCategoryId) {
            response = yield (0, global_category_functions_1.updateGlobalCategoryforId)(data, globalCategoryId);
            if (response === null || response === void 0 ? void 0 : response.status) {
                res.status(200).json({
                    status: true,
                    data: response === null || response === void 0 ? void 0 : response.data,
                    msg: "Global Category Updated Successfully ",
                    msgFrom: "api/v1/global-category/update"
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    error: response === null || response === void 0 ? void 0 : response.error,
                    msg: "Error While Updating Global Category",
                    msgFrom: "api/v1/global-category/update"
                });
            }
        }
        else {
            res.status(200).json({
                status: false,
                msg: "invalid inputs",
                msgFrom: "api/v1/chanel-partner/update"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some database error",
            msgFrom: "/api/v1/global-category/update",
            error: error
        });
    }
}));
exports.globalCategoryRouter.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/global-category/delete?id=4
    try {
        const globalCategoryId = parseInt(req.query.id);
        if (globalCategoryId) {
            const response = yield (0, global_category_functions_1.deleteGlobalCategoryById)(globalCategoryId);
            if (response === null || response === void 0 ? void 0 : response.status) {
                res.status(200).json({
                    status: true,
                    data: response === null || response === void 0 ? void 0 : response.data,
                    msg: "Global Category Deleted Successfully",
                    msgFrom: "api/v1/global-category/delete?id"
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    error: response === null || response === void 0 ? void 0 : response.error,
                    msg: "Error while deleting Global Category",
                    msgFrom: "api/v1/global-category/delete?id"
                });
            }
        }
        else {
            res.status(200).json({
                status: false,
                msg: "invalid input",
                msgFrom: "api/v1/global-category/delete?id"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some database error",
            error: error,
            msgFrom: "api/v1/global-category/delete?id"
        });
    }
}));
