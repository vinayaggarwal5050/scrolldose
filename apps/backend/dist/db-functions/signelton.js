"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClient = void 0;
const client_1 = require("@prisma/client");
let prisma = null;
const getPrismaClient = () => {
    if (!prisma) {
        return new client_1.PrismaClient();
    }
    else {
        return prisma;
    }
};
exports.getPrismaClient = getPrismaClient;
