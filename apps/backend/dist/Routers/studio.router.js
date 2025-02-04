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
exports.studioRouter = void 0;
const express_1 = require("express");
const studio_functions_1 = require("../db-functions/studio-functions");
exports.studioRouter = (0, express_1.Router)();
exports.studioRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/studio
    //http://localhost:5000/api/v1/studio?id=3
    //http://localhost:5000/api/v1/studio?email=superadmin@gmail.com
    const channelPartnerEmail = req.query.channelpartneremail;
    const channelPartnerId = req.query.channelpartnerid;
    const studioId = req.query.studioid;
    let response;
    if (studioId) {
        response = yield (0, studio_functions_1.getStudioByStudioId)(parseInt(studioId));
    }
    else if (channelPartnerEmail) {
        response = yield (0, studio_functions_1.getStudioByChannelPartnerEmail)(channelPartnerEmail);
    }
    else if (channelPartnerId) {
        response = yield (0, studio_functions_1.getStudioByChannelPartnerId)(parseInt(channelPartnerId));
    }
    else {
        response = yield (0, studio_functions_1.getAllStudios)();
    }
    if (response.status) {
        res.status(200).json({
            status: true,
            data: response.data,
            msg: "Studio Fetched Succesfully",
            msgFrom: "/api/v1/studio"
        });
    }
    else {
        res.status(200).json({
            status: false,
            error: response.error,
            msg: "Error in fetching Studio",
            msgFrom: "/api/v1/studio"
        });
    }
}));
exports.studioRouter.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/studio/create?channelpartnerid=3
    const channelPartnerId = parseInt(req.query.channelpartnerid);
    const studioData = req.body;
    // const { name, link } = studioData;
    if (channelPartnerId) {
        try {
            const response = yield (0, studio_functions_1.createStudioForChannelPartnerId)(studioData, channelPartnerId);
            if (response.status) {
                res.status(200).json({
                    status: true,
                    data: response.data,
                    msg: "Studio Created Successfully!",
                    msgFrom: "/api/v1/studio/create"
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    msg: response === null || response === void 0 ? void 0 : response.error,
                    error: response === null || response === void 0 ? void 0 : response.error,
                    msgFrom: "/api/v1/studio/create"
                });
            }
        }
        catch (error) {
            res.status(200).json({
                status: false,
                msg: "some error",
                msgFrom: "/api/v1/studio/create",
                error: error
            });
        }
    }
    else {
        res.status(200).json({
            status: false,
            msg: "invalid data",
            msgFrom: "/api/v1/store/create"
        });
    }
}));
exports.studioRouter.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/studio/update?studioid=3
    try {
        const studioId = parseFloat(req.query.studioid);
        const studioData = req.body;
        let response;
        if (!studioId) {
            res.status(200).json({
                status: false,
                msg: "invalid input",
                msgFrom: "api/v1/studio/update?studioid"
            });
        }
        else {
            response = yield (0, studio_functions_1.updateStudioForStudioId)(studioData, studioId);
            if (response.status) {
                res.status(200).json({
                    status: true,
                    data: response.data,
                    msg: "Studio Updated Successfully",
                    msgFrom: "api/v1/studio/update?studioid"
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    error: response.error,
                    msg: "Error While Updating Studio",
                    msgFrom: "api/v1/store/update?studioid"
                });
            }
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some error",
            error: error,
            msgFrom: "api/v1/store/update?studioid"
        });
    }
}));
exports.studioRouter.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/store/delete?studioid=4
    try {
        const studioId = parseInt(req.query.studioid);
        const response = yield (0, studio_functions_1.deleteStudioById)(studioId);
        if (response.status) {
            res.status(200).json({
                status: true,
                data: response.data,
                msg: "Studio Deleted Succesfully",
                msgFrom: "/api/v1/studio/delete"
            });
        }
        else {
            res.status(200).json({
                status: false,
                error: response.error,
                msg: "Error in Deleting Studio",
                msgFrom: "/api/v1/studio/delete"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some error",
            msgFrom: "/api/v1/studio/delete",
            error: error
        });
    }
}));
