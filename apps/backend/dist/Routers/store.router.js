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
const store_mw_1 = require("./middlewares/store.mw");
exports.storeRouter = (0, express_1.Router)();
exports.storeRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/store
    //http://localhost:6000/api/v1/store?id=3
    //http://localhost:6000/api/v1/store?email=superadmin@gmail.com
    const channelPartnerEmail = req.query.channelpartneremail;
    const channelPartnerId = req.query.channelpartnerid;
    const id = req.query.id;
    let data;
    if (id) {
        data = yield (0, store_functions_1.getStoreById)(parseInt(id));
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
exports.storeRouter.post('/create', store_mw_1.validateCreateStore, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/store/create?channelPartnerId=3
    const channelPartnerId = parseInt(req.query.channelpartnerid);
    const productData = req.body;
    try {
        const data = yield (0, store_functions_1.createStoreForChannelPartnerId)(productData, channelPartnerId);
        res.status(200).json({
            status: true,
            data: data,
            msg: "/api/v1/store/create"
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
exports.storeRouter.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/store/update?storeId=3
    //http://localhost:6000/api/v1/store/update?channelpartneremail=test@gmail.com
    //http://localhost:6000/api/v1/store/update?channelpartnerid=4
    try {
        const storeId = parseFloat(req.query.storeid);
        const channelPartnerId = parseFloat(req.query.channelpartnerid);
        const channelPartnerEmail = req.query.email;
        const storeData = req.body;
        if (storeId) {
            const data = yield (0, store_functions_1.updateStoreForStoreId)(storeData, storeId);
            res.status(200).json({
                status: "true",
                data: data,
                msg: "api/v1/store/update/storeId"
            });
        }
        else if (channelPartnerEmail) {
            const data = yield (0, store_functions_1.updateStoreForChannelPartnerEmail)(storeData, channelPartnerEmail);
            res.status(200).json({
                status: "true",
                data: data,
                msg: "api/v1/store/update/storeId"
            });
        }
        else if (channelPartnerId) {
            const data = yield (0, store_functions_1.updateStoreForChannelPartnerId)(storeData, channelPartnerId);
            res.status(200).json({
                status: "true",
                data: data,
                msg: "api/v1/store/update/storeId"
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
