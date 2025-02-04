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
exports.storeRouter = void 0;
const express_1 = require("express");
const store_functions_1 = require("../db-functions/store-functions");
exports.storeRouter = (0, express_1.Router)();
exports.storeRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/store
    //http://localhost:6000/api/v1/store?id=3
    //http://localhost:6000/api/v1/store?email=superadmin@gmail.com
    const channelPartnerEmail = req.query.channelpartneremail;
    const channelPartnerId = req.query.channelpartnerid;
    const storeId = req.query.storeid;
    let data;
    if (storeId) {
        data = yield (0, store_functions_1.getStoreByStoreId)(parseInt(storeId));
    }
    else if (channelPartnerEmail) {
        data = yield (0, store_functions_1.getStoreByChannelPartnerEmail)(channelPartnerEmail);
    }
    else if (channelPartnerId) {
        data = yield (0, store_functions_1.getStoreByChannelPartnerId)(parseInt(channelPartnerId));
    }
    else {
        data = yield (0, store_functions_1.getAllStores)();
    }
    res.status(200).json({
        status: true,
        data: data,
        msg: "/api/v1/stores"
    });
}));
exports.storeRouter.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/store/create?channelpartnerid=3
    const channelPartnerId = parseInt(req.query.channelpartnerid);
    const storeData = req.body;
    const { name, slug } = storeData;
    if (channelPartnerId && name && slug) {
        try {
            const response = yield (0, store_functions_1.createStoreForChannelPartnerId)(storeData, channelPartnerId);
            if (response.status) {
                res.status(200).json({
                    status: true,
                    data: response.data,
                    msg: "Store Created Successfully!",
                    msgFrom: "/api/v1/channel-partner/create"
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    msg: response === null || response === void 0 ? void 0 : response.error,
                    error: response === null || response === void 0 ? void 0 : response.error,
                    msgFrom: "/api/v1/channel-partner/create"
                });
            }
        }
        catch (error) {
            res.status(200).json({
                status: false,
                msg: "some error",
                msgFrom: "/api/v1/channel-partner/create",
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
exports.storeRouter.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/store/update?storeid=3
    //http://localhost:5000/api/v1/store/update?channelpartneremail=test@gmail.com
    //http://localhost:5000/api/v1/store/update?channelpartnerid=4
    try {
        const storeId = parseFloat(req.query.storeid);
        const channelPartnerId = parseFloat(req.query.channelpartnerid);
        const channelPartnerEmail = req.query.channelpartneremail;
        const storeData = req.body;
        // console.log(storeId, channelPartnerId, channelPartnerEmail, storeData);
        let response;
        if (storeId) {
            response = yield (0, store_functions_1.updateStoreForStoreId)(storeData, storeId);
        }
        else if (channelPartnerEmail) {
            response = yield (0, store_functions_1.updateStoreForChannelPartnerEmail)(storeData, channelPartnerEmail);
        }
        else if (channelPartnerId) {
            response = yield (0, store_functions_1.updateStoreForChannelPartnerId)(storeData, channelPartnerId);
        }
        else {
            res.status(200).json({
                status: false,
                msg: "invalid input",
                msgFrom: "api/v1/store/update/channelPartnerId"
            });
        }
        if (response.status) {
            res.status(200).json({
                status: true,
                data: response.data,
                msg: "Store Updated Successfully",
                msgFrom: "api/v1/store/update/channelPartnerId"
            });
        }
        else if (response.error) {
            res.status(200).json({
                status: false,
                error: response.error,
                msg: "Error While Updating Store",
                msgFrom: "api/v1/store/update/channelPartnerId"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some error",
            error: error,
            msgFrom: "api/v1/store/update/channelPartnerId"
        });
    }
}));
exports.storeRouter.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/store/delete?id=4
    try {
        const storeId = parseInt(req.query.id);
        const data = yield (0, store_functions_1.deleteStoreById)(storeId);
        res.status(200).json({
            status: "true",
            data: data,
            msg: "api/v1/store/update/id"
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
