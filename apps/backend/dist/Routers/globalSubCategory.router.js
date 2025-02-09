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
exports.globalSubCategoryRouter = void 0;
const express_1 = require("express");
const global_subcategory_functions_1 = require("../db-functions/global-subcategory-functions");
exports.globalSubCategoryRouter = (0, express_1.Router)();
exports.globalSubCategoryRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/global-sub-category
    //http://localhost:5000/api/v1/global-sub-category?id=3
    //http://localhost:5000/api/v1/global-sub-category?globalcategoryid=3
    const globalSubCategoryId = parseInt(req.query.id);
    const globalCategoryId = parseInt(req.query.globalcategoryid);
    let response;
    try {
        if (globalSubCategoryId) {
            response = yield (0, global_subcategory_functions_1.getGlobalSubCategoryByGlobalSubCategoryId)(globalSubCategoryId);
        }
        else if (globalCategoryId) {
            response = yield (0, global_subcategory_functions_1.getGlobalSubCategoryForGlobalCategoryId)(globalCategoryId);
        }
        else {
            response = yield (0, global_subcategory_functions_1.getAllGlobalSubCategories)();
        }
        if (response === null || response === void 0 ? void 0 : response.status) {
            res.status(200).json({
                status: true,
                data: response.data,
                msg: "Global Sub Category fetched successfully",
                msgFrom: "/api/v1/global-sub-category"
            });
        }
        else {
            res.status(200).json({
                status: false,
                msg: "Error Finding Global Sub Category",
                error: response === null || response === void 0 ? void 0 : response.error,
                msgFrom: "/api/v1/global-sub-category"
            });
        }
    }
    catch (error) {
        res.json({
            status: false,
            msg: "database error",
            msgFrom: "/api/v1/global-sub-category"
        });
    }
}));
exports.globalSubCategoryRouter.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/global-sub-category/create?globalcategoryid=2
    const globalCategoryId = parseInt(req.query.globalcategoryid);
    try {
        const response = yield (0, global_subcategory_functions_1.createGlobalSubCategory)(req.body, globalCategoryId);
        if (response === null || response === void 0 ? void 0 : response.status) {
            res.status(200).json({
                status: true,
                data: response === null || response === void 0 ? void 0 : response.data,
                msg: "Global Sub Category Created Successfully",
                msgFrom: "/api/v1/global-sub-category/create"
            });
        }
        else {
            res.status(200).json({
                status: false,
                msg: "Error While creating Global Sub Category",
                error: response === null || response === void 0 ? void 0 : response.error,
                msgFrom: "/api/v1/global-sub-category/create"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some Database Error",
            msgFrom: "/api/v1/global-sub-category/create",
            error: error
        });
    }
}));
exports.globalSubCategoryRouter.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/global-sub-category/update?id=3
    try {
        const globalSubCategoryId = parseInt(req.query.id);
        const data = req.body;
        let response;
        if (globalSubCategoryId) {
            response = yield (0, global_subcategory_functions_1.updateGlobalSubCategoryforId)(data, globalSubCategoryId);
            if (response === null || response === void 0 ? void 0 : response.status) {
                res.status(200).json({
                    status: true,
                    data: response === null || response === void 0 ? void 0 : response.data,
                    msg: "Global Sub Category Updated Successfully ",
                    msgFrom: "api/v1/global-sub-category/update"
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    error: response === null || response === void 0 ? void 0 : response.error,
                    msg: "Error While Updating Global Sub Category",
                    msgFrom: "api/v1/global-sub-category/update"
                });
            }
        }
        else {
            res.status(200).json({
                status: false,
                msg: "invalid inputs",
                msgFrom: "api/v1/global-sub-category/update"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some database error",
            msgFrom: "/api/v1/global-sub-category/update",
            error: error
        });
    }
}));
exports.globalSubCategoryRouter.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/global-sub-category/delete?id=4
    try {
        const globalSubCategoryId = parseInt(req.query.id);
        if (globalSubCategoryId) {
            const response = yield (0, global_subcategory_functions_1.deleteGlobalSubCategoryById)(globalSubCategoryId);
            if (response === null || response === void 0 ? void 0 : response.status) {
                res.status(200).json({
                    status: true,
                    data: response === null || response === void 0 ? void 0 : response.data,
                    msg: "Global Sub Category Deleted Successfully",
                    msgFrom: "api/v1/global-sub-category/delete?id"
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    error: response === null || response === void 0 ? void 0 : response.error,
                    msg: "Error while deleting Global Sub Category",
                    msgFrom: "api/v1/global-sub-category/delete?id"
                });
            }
        }
        else {
            res.status(200).json({
                status: false,
                msg: "invalid input",
                msgFrom: "api/v1/global-sub-category/delete?id"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some database error",
            error: error,
            msgFrom: "api/v1/global-sub-category/delete?id"
        });
    }
}));
