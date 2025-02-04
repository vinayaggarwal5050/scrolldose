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
    let response;
    if (email) {
        response = yield (0, channel_partner_functions_1.getChannelPartnerByEmail)(email);
    }
    else if (id) {
        response = yield (0, channel_partner_functions_1.getChannelPartnerById)(parseInt(id));
    }
    else {
        response = yield (0, channel_partner_functions_1.getAllChannelPartners)();
    }
    if (response.status) {
        res.status(200).json({
            status: true,
            data: response.data,
            msgFrom: "/api/v1/channel-partner"
        });
    }
    else {
        res.status(200).json({
            status: false,
            msg: "Error Finding channelPartners",
            error: response === null || response === void 0 ? void 0 : response.error,
            msgFrom: "/api/v1/channel-partner/create"
        });
    }
}));
exports.channelPartnerRouter.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/channel-partner/create
    try {
        const response = yield (0, channel_partner_functions_1.createChannelPartner)(req.body);
        if (response === null || response === void 0 ? void 0 : response.error) {
            res.status(200).json({
                status: false,
                msg: response === null || response === void 0 ? void 0 : response.error,
                error: response === null || response === void 0 ? void 0 : response.error,
                msgFrom: "/api/v1/channel-partner/create"
            });
        }
        else {
            const { id, email, role } = response.data;
            const cpJWT = (0, channelPartner_mw_1.generateCPJWT)({ id, email, role });
            const data = response.data;
            res.status(200).json({
                status: true,
                data: Object.assign(Object.assign({}, data), { cpJWT }),
                msg: "Account Created Successfully",
                msgFrom: "/api/v1/channel-partner/create"
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
//some error in logic, multile times response is getting sent
exports.channelPartnerRouter.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/channel-partner/update?email=test@gmail.com
    //http://localhost:6000/api/v1/channel-partner/update?id=3
    try {
        const email = req.query.email;
        const id = req.query.id;
        let response;
        if (email) {
            response = yield (0, channel_partner_functions_1.updateChannelPartnerforEmail)(Object.assign(Object.assign({}, req.body), { "email": email }));
        }
        else if (id) {
            response = yield (0, channel_partner_functions_1.updateChannelPartnerforId)(Object.assign(Object.assign({}, req.body), { "id": parseInt(id) }));
        }
        else {
            res.status(200).json({
                status: false,
                msg: "invalid input",
                msgFrom: "api/v1/chanel-partner/update"
            });
        }
        if (response.status) {
            res.status(200).json({
                status: true,
                data: response.data,
                msg: "Channel Partner Updated Successfully ",
                msgFrom: "api/v1/chanel-partner/update"
            });
        }
        else {
            res.status(200).json({
                status: false,
                error: response.error,
                msg: "Error While Updating Channel Partner",
                msgFrom: "api/v1/chanel-partner/update"
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
exports.channelPartnerRouter.post('/signin', channelPartner_mw_1.cpSignInAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        status: true,
        msg: "user signed in",
        msgFrom: "user Singed in"
    });
}));
