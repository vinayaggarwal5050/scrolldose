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
exports.channelPartnerRouter = void 0;
const express_1 = require("express");
const channel_partner_functions_1 = require("../db-functions/channel-partner-functions");
const channelPartner_mw_1 = require("./middlewares/channelPartner.mw");
exports.channelPartnerRouter = (0, express_1.Router)();
exports.channelPartnerRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/channel-partner
    //http://localhost:6000/api/v1/channel-partner?email=superadmin@gmail.com
    //http://localhost:6000/api/v1/channel-partner?id=3
    const email = req.query.email;
    const id = req.query.id;
    let data;
    if (email) {
        data = yield (0, channel_partner_functions_1.getChannelPartnerByEmail)(email);
    }
    else if (id) {
        data = yield (0, channel_partner_functions_1.getChannelPartnerById)(parseInt(id));
    }
    else {
        data = yield (0, channel_partner_functions_1.getAllChannelPartners)();
    }
    res.status(200).json({
        status: true,
        data: data,
        msg: "/api/v1/channel-partner"
    });
}));
exports.channelPartnerRouter.post('/create', channelPartner_mw_1.validateCreateChannelPartner, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/channel-partner/create
    try {
        const data = yield (0, channel_partner_functions_1.createChannelPartner)(req.body);
        res.status(200).json({
            status: true,
            data: data,
            msg: "/api/v1/channel-partner/create"
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
exports.channelPartnerRouter.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/channel-partner/update?email=test@gmail.com
    //http://localhost:6000/api/v1/channel-partner/update?id=3
    try {
        const email = req.query.email;
        const id = req.query.id;
        if (email) {
            const data = yield (0, channel_partner_functions_1.updateChannelPartnerforEmail)(Object.assign(Object.assign({}, req.body), { "email": email }));
            res.status(200).json({
                status: "true",
                data: data,
                msg: "api/v1/super-user/update/email"
            });
        }
        else if (id) {
            const data = yield (0, channel_partner_functions_1.updateChannelPartnerforId)(Object.assign(Object.assign({}, req.body), { "id": parseInt(id) }));
            res.status(200).json({
                status: "true",
                data: data,
                msg: "api/v1/super-user/update/id"
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
exports.channelPartnerRouter.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/channel-partner/delete?email=test@gmail.com
    //http://localhost:6000/api/v1/channel-partner/delete?id=4
    try {
        const email = req.query.email;
        const id = req.query.id;
        if (email) {
            const data = yield (0, channel_partner_functions_1.deleteChannelPartnerByEmail)(email);
            res.status(200).json({
                status: "true",
                data: data,
                msg: "api/v1/super-user/update/email"
            });
        }
        else if (id) {
            const data = yield (0, channel_partner_functions_1.deleteChannelPartnerById)(parseInt(id));
            res.status(200).json({
                status: "true",
                data: data,
                msg: "api/v1/super-user/update/id"
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
