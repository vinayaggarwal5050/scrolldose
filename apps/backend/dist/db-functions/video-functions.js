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
exports.deleteVideoEntryByVideoId = exports.updateVideoByVideoId = exports.getVideoEnteriesForStudioId = exports.getVideoEntryByVideoSlug = exports.getVideoEntryByVideoId = exports.getAllVideoEnteries = exports.createVideoEntryForStudioId = void 0;
const signelton_1 = require("./signelton");
const prisma = (0, signelton_1.getPrismaClient)();
const createVideoEntryForStudioId = (videoData, studioId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.video.create({
            data: {
                title: videoData.title,
                slug: videoData.slug,
                category: videoData === null || videoData === void 0 ? void 0 : videoData.category,
                categoryId: videoData === null || videoData === void 0 ? void 0 : videoData.categoryId,
                thumbnailPath: videoData === null || videoData === void 0 ? void 0 : videoData.thumbnailPath,
                tags: videoData === null || videoData === void 0 ? void 0 : videoData.tags,
                status: videoData === null || videoData === void 0 ? void 0 : videoData.status,
                studio: {
                    connect: {
                        id: studioId
                    }
                }
            },
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Creating Video Entry:', error);
        return { status: true, error: error };
    }
});
exports.createVideoEntryForStudioId = createVideoEntryForStudioId;
const getAllVideoEnteries = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.video.findMany({
            select: {
                id: true,
                title: true,
                slug: true,
                category: true,
                categoryId: true,
                tags: true,
                filePath: true,
                thumbnailPath: true,
                status: true,
                studioId: true,
                createdAt: true,
                lastUpdate: true,
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error fetching videos:', error);
        return { status: true, error: error };
    }
});
exports.getAllVideoEnteries = getAllVideoEnteries;
// export const getProductsByRange = async (startIndex: number, endIndex: number, limit: number) => {
//   try {
//     const response = await prisma.product.findMany({
//       where: {
//         id: {
//           gte: startIndex,
//           lte: endIndex,
//         },
//       },
//       orderBy: {
//         id: 'asc',
//       },
//       take: limit, // Ensures that only 'limit' products are returned
//     });
//     return response;
//   } catch (error) {
//     console.error('Error fetching products by range:', error);
//     return error;
//   }
// };
// export const getProductsByRangeAndUserId = async (startIndex: number, endIndex: number, limit: number, userId: number) => {
//   try {
//     const products = await prisma.product.findMany({
//       where: {
//         id: {
//           gte: startIndex,
//           lte: endIndex,
//         },
//       },
//       orderBy: {
//         id: 'asc',
//       },
//       take: limit,
//       include: {
//         wishedByUsers: {
//           select: {
//             userId: true,
//           },
//         },
//       },
//     });
//     const result = products.map((product) => {
//       return {
//         ...product,
//         isWishedByUser: product.wishedByUsers.some((user) => user.userId === userId),
//       };
//     });
//     return result;
//   } catch (error) {
//     console.error('Error fetching products by range and user ID:', error);
//     return error;
//   }
// };
const getVideoEntryByVideoId = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.video.findFirst({
            where: {
                id: videoId
            },
            select: {
                id: true,
                title: true,
                slug: true,
                category: true,
                categoryId: true,
                tags: true,
                status: true,
                filePath: true,
                thumbnailPath: true,
                studioId: true,
                createdAt: true,
                lastUpdate: true,
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Finding Video:', error);
        return { status: true, error: error };
    }
});
exports.getVideoEntryByVideoId = getVideoEntryByVideoId;
const getVideoEntryByVideoSlug = (videoSlug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.video.findFirst({
            where: {
                slug: videoSlug
            },
            select: {
                id: true,
                title: true,
                slug: true,
                category: true,
                categoryId: true,
                tags: true,
                status: true,
                filePath: true,
                thumbnailPath: true,
                studioId: true,
                createdAt: true,
                lastUpdate: true,
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Finding Video:', error);
        return { status: true, error: error };
    }
});
exports.getVideoEntryByVideoSlug = getVideoEntryByVideoSlug;
const getVideoEnteriesForStudioId = (studioId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.video.findMany({
            where: {
                studioId: studioId
            },
            select: {
                id: true,
                title: true,
                slug: true,
                category: true,
                categoryId: true,
                tags: true,
                status: true,
                filePath: true,
                thumbnailPath: true,
                studioId: true,
                createdAt: true,
                lastUpdate: true,
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Finding Video:', error);
        return { status: true, error: error };
    }
});
exports.getVideoEnteriesForStudioId = getVideoEnteriesForStudioId;
const updateVideoByVideoId = (data, videoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.video.update({
            where: {
                id: videoId
            },
            data: {
                title: data === null || data === void 0 ? void 0 : data.title,
                slug: data === null || data === void 0 ? void 0 : data.slug,
                category: data === null || data === void 0 ? void 0 : data.category,
                categoryId: data === null || data === void 0 ? void 0 : data.categoryId,
                tags: data === null || data === void 0 ? void 0 : data.tags,
                status: data === null || data === void 0 ? void 0 : data.status,
                thumbnailPath: data === null || data === void 0 ? void 0 : data.thumbnailPath,
                filePath: data === null || data === void 0 ? void 0 : data.filePath,
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Updaing video:', error);
        return { status: true, error: error };
    }
});
exports.updateVideoByVideoId = updateVideoByVideoId;
const deleteVideoEntryByVideoId = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.video.delete({
            where: {
                id: videoId
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Deleting Video Entry:', error);
        return { status: true, error: error };
    }
});
exports.deleteVideoEntryByVideoId = deleteVideoEntryByVideoId;
