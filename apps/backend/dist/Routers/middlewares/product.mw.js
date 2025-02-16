"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateProduct = exports.upload = void 0;
const zod_1 = require("zod");
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const uploadDir = "./../product-images";
fs_1.default.mkdirSync(uploadDir, { recursive: true });
// Multer Storage Configuration
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${req.body.slug}-${Date.now() + "-" + file.originalname}`;
        cb(null, uniqueName);
    },
});
exports.upload = (0, multer_1.default)({ storage });
const createProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(5, 'name must be at least 3 characters long'),
    description: zod_1.z.string().optional(),
    price: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    link: zod_1.z.string().optional(),
    slug: zod_1.z.string().optional(),
    video: zod_1.z.string().optional(),
    tag: zod_1.z.string().optional()
});
const validateCreateProduct = (req, res, next) => {
    try {
        createProductSchema.safeParse(req.body);
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
exports.validateCreateProduct = validateCreateProduct;
