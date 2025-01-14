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
exports.superadminRouter = void 0;
const express_1 = require("express");
const superadmin_functions_1 = require("../db-functions/superadmin-functions");
exports.superadminRouter = (0, express_1.Router)();
exports.superadminRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/super-admin
    //http://localhost:6000/api/v1/super-admin?email=superadmin@gmail.com
    //http://localhost:6000/api/v1/super-admin?id=3
    const email = req.query.email;
    const id = req.query.id;
    let data;
    if (email) {
        data = yield (0, superadmin_functions_1.getSuperadminByEmail)(email);
    }
    else if (id) {
        data = yield (0, superadmin_functions_1.getSuperadminById)(parseInt(id));
    }
    else {
        data = yield (0, superadmin_functions_1.getAllSuperadmin)();
    }
    res.json({
        status: true,
        data: data,
        msg: "/api/v1/super-admin"
    });
}));
exports.superadminRouter.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/super-admin/create
    try {
        const data = yield (0, superadmin_functions_1.createSuperadmin)(req.body);
        res.json({
            status: true,
            data: data,
            msg: "/api/v1/super-admin/create"
        });
    }
    catch (error) {
        res.json({
            status: false,
            msg: "some error",
            error: error
        });
    }
}));
exports.superadminRouter.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/super-admin/update?email=test@gmail.com
    //http://localhost:6000/api/v1/super-admin/update?id=3
    try {
        const email = req.query.email;
        const id = req.query.id;
        if (email) {
            const data = yield (0, superadmin_functions_1.updateSuperadmintforEmail)(Object.assign(Object.assign({}, req.body), { "email": email }));
            res.json({
                status: "true",
                data: data,
                msg: "api/v1/super-user/update/email"
            });
        }
        else if (id) {
            const data = yield (0, superadmin_functions_1.updateSuperadmintforId)(Object.assign(Object.assign({}, req.body), { "id": parseInt(id) }));
            res.json({
                status: "true",
                data: data,
                msg: "api/v1/super-user/update/id"
            });
        }
        else {
            res.json({
                status: false,
                msg: "invalid input"
            });
        }
    }
    catch (error) {
        res.json({
            status: false,
            msg: "some error",
            error: error
        });
    }
}));
exports.superadminRouter.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const id = req.query.id;
        if (email) {
            const data = yield (0, superadmin_functions_1.deleteSuperUserByEmail)(email);
            res.json({
                status: "true",
                data: data,
                msg: "api/v1/super-user/update/email"
            });
        }
        else if (id) {
            const data = yield (0, superadmin_functions_1.deleteSuperUserById)(parseInt(id));
            res.json({
                status: "true",
                data: data,
                msg: "api/v1/super-user/update/id"
            });
        }
        else {
            res.json({
                status: false,
                msg: "invalid input"
            });
        }
    }
    catch (error) {
        res.json({
            status: false,
            msg: "some error",
            error: error
        });
    }
}));
