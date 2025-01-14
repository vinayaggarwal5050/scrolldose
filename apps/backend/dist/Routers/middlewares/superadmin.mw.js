"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateSuperuser = void 0;
const zod_1 = require("zod");
const createSuperuserSchema = zod_1.z.object({
    email: zod_1.z.string().email('invalid email format'),
    password: zod_1.z.string().min(3, 'Password must be at least 3 characters long'),
    name: zod_1.z.string().optional()
});
const validateCreateSuperuser = (req, res, next) => {
    try {
        createSuperuserSchema.safeParse(req.body);
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
exports.validateCreateSuperuser = validateCreateSuperuser;
