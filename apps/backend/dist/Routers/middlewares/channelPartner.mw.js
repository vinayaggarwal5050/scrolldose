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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cpSignInAuth = exports.generateCPJWT = exports.validateCreateChannelPartner = void 0;
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const channel_partner_functions_1 = require("../../db-functions/channel-partner-functions");
const createChannelPartnerSchema = zod_1.z.object({
    email: zod_1.z.string().email('invalid email format'),
    password: zod_1.z.string().min(3, 'Password must be at least 3 characters long'),
    name: zod_1.z.string().optional()
});
const validateCreateChannelPartner = (req, res, next) => {
    try {
        createChannelPartnerSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                status: false,
                errors: error.errors.map((err) => ({
                    field: err.path[0], // Field name causing the error
                    message: err.message, // Error message
                })),
            });
        }
    }
    res.status(400).json({
        status: false,
        message: "some schema exception"
    });
};
exports.validateCreateChannelPartner = validateCreateChannelPartner;
const CP_JWT_SECRET_KEY = "123";
const generateCPJWT = (payload) => {
    const cpJWT = jsonwebtoken_1.default.sign(payload, CP_JWT_SECRET_KEY);
    return cpJWT;
};
exports.generateCPJWT = generateCPJWT;
const verifyCPJWT = (cpJWT) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(cpJWT, CP_JWT_SECRET_KEY);
        return decoded;
    }
    catch (error) {
        throw new Error('Invalid or expired token');
    }
};
const cpSignInAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(200).json({
            status: false,
            msg: "invalid data",
            msgFrom: "api/v1/channel-partner/signin/invalid-data"
        });
        return;
    }
    const response = yield (0, channel_partner_functions_1.getChannelPartnerByEmail)(email);
    const cpData = response.data;
    if (!cpData) {
        res.status(200).json({
            status: false,
            msg: "Channel Partner with Given Email Does Not Exists",
            msgFrom: "api/v1/channel-partner/signin/invalid-email"
        });
        return;
    }
    if (cpData.password !== password) {
        res.status(200).json({
            status: false,
            msg: "Invalid Password",
            msgFrom: "api/v1/channel-partner/signin/invalid-email"
        });
        return;
    }
    const payload = {
        "id": cpData.id,
        "email": cpData.email,
        "role": cpData.role
    };
    const cpJWT = (0, exports.generateCPJWT)(payload);
    res.status(200).json({
        status: true,
        data: Object.assign(Object.assign({}, cpData), { cpJWT }),
        msg: "Login Successful",
        msgFrom: "api/v1/channel-partner/signin/success"
    });
});
exports.cpSignInAuth = cpSignInAuth;
