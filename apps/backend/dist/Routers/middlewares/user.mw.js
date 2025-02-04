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
exports.userAuth = exports.userSignInAuth = exports.validateCreateUser = void 0;
const zod_1 = require("zod");
const user_funtions_1 = require("../../db-functions/user-funtions");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUserSchema = zod_1.z.object({
    userEmail: zod_1.z.string().email('invalid email format'),
    userPasswod: zod_1.z.string().min(3, 'Password must be at least 3 characters long'),
    userName: zod_1.z.string().optional()
});
const validateCreateUser = (req, res, next) => {
    try {
        createUserSchema.safeParse(req.body);
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
exports.validateCreateUser = validateCreateUser;
const USER_JWT_SECRET_KEY = "123";
const generateUserJWT = (payload) => {
    const userJWT = jsonwebtoken_1.default.sign(payload, USER_JWT_SECRET_KEY);
    return userJWT;
};
const verifyUserJWT = (userJWT) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(userJWT, USER_JWT_SECRET_KEY);
        return decoded;
    }
    catch (error) {
        throw new Error('Invalid or expired token');
    }
};
const userSignInAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
        res.status(200).json({
            status: false,
            msg: "invalid data",
            msgFrom: "api/v1/user/signin/invalid-data"
        });
        return;
    }
    const userData = yield (0, user_funtions_1.getUserByUserEmail)(userEmail);
    if (!userData) {
        res.status(200).json({
            status: false,
            msg: "User with Given Email Does Not Exists",
            msgFrom: "api/v1/user/signin/invalid-email"
        });
        return;
    }
    if (userData.userPassword !== userPassword) {
        res.status(200).json({
            status: false,
            msg: "Invalid Password",
            msgFrom: "api/v1/user/signin/invalid-password"
        });
        return;
    }
    const payload = {
        "userId": userData.userId,
        "userEmail": userData.userEmail
    };
    const userJWT = generateUserJWT(payload);
    res.status(200).json({
        status: true,
        data: Object.assign(Object.assign({}, userData), { userJWT }),
        msg: "Login Successful",
        msgFrom: "api/v1/user/signin/success"
    });
});
exports.userSignInAuth = userSignInAuth;
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userJWT } = req.body;
    if (!userJWT) {
        res.status(200).json({
            status: false,
            msg: "No Access Token Found"
        });
        return;
    }
    try {
        const payload = verifyUserJWT(userJWT);
        // console.log(payload);
        req.body = payload;
        next();
    }
    catch (err) {
        res.status(200).json({
            status: false,
            msg: "Invalid User Access Token"
        });
        return;
    }
});
exports.userAuth = userAuth;
