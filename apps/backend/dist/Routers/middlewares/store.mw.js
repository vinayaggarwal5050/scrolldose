"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateStore = void 0;
const zod_1 = require("zod");
const createStoreSchema = zod_1.z.object({
    name: zod_1.z.string().min(5, 'name must be at least 3 characters long'),
    slug: zod_1.z.string().optional()
});
const validateCreateStore = (req, res, next) => {
    try {
        createStoreSchema.safeParse(req.body);
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
exports.validateCreateStore = validateCreateStore;
