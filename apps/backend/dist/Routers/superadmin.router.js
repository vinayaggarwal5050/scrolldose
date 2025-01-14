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
    try {
        const input = req.body;
        console.log(input);
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
exports.superadminRouter.put('/update', (req, res) => {
});
