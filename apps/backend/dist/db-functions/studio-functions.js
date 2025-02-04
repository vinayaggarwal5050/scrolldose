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
exports.deleteStudioById = exports.updateStudioForStudioId = exports.getStudioByChannelPartnerEmail = exports.getStudioByChannelPartnerId = exports.getStudioByStudioId = exports.getAllStudios = exports.createStudioForChannelPartnerId = void 0;
const signelton_1 = require("./signelton");
const prisma = (0, signelton_1.getPrismaClient)();
const createStudioForChannelPartnerId = (studioData, channelPartnerID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.studio.create({
            data: {
                name: studioData.name,
                link: studioData === null || studioData === void 0 ? void 0 : studioData.link,
                channelPartner: {
                    connect: {
                        id: channelPartnerID
                    }
                }
            },
            select: {
                id: true,
                name: true,
                link: true,
                channelPartnerId: true
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error("Error Occured While creating Studio:", error);
        return { status: false, error: error };
    }
});
exports.createStudioForChannelPartnerId = createStudioForChannelPartnerId;
const getAllStudios = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.studio.findMany({
            select: {
                id: true,
                name: true,
                link: true,
                channelPartnerId: true,
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error fetching stores:', error);
        return { status: false, error: error };
    }
});
exports.getAllStudios = getAllStudios;
const getStudioByStudioId = (studioId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.studio.findFirst({
            where: {
                id: studioId
            },
            select: {
                id: true,
                name: true,
                link: true,
                channelPartnerId: true
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Finding stores:', error);
        return { status: false, error: error };
    }
});
exports.getStudioByStudioId = getStudioByStudioId;
const getStudioByChannelPartnerId = (channelPartnerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.studio.findFirst({
            where: {
                channelPartnerId: channelPartnerId
            },
            select: {
                id: true,
                name: true,
                link: true,
                channelPartnerId: true
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Finding stores:', error);
        return { status: false, error: error };
    }
});
exports.getStudioByChannelPartnerId = getStudioByChannelPartnerId;
const getStudioByChannelPartnerEmail = (channelPartnerEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.channelPartner.findUnique({
            where: {
                email: channelPartnerEmail
            },
            include: {
                studio: true
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Finding stores:', error);
        return { status: false, error: error };
    }
});
exports.getStudioByChannelPartnerEmail = getStudioByChannelPartnerEmail;
const updateStudioForStudioId = (studioData, studioId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedStudio = yield prisma.studio.update({
            where: {
                id: studioId
            },
            data: {
                name: studioData === null || studioData === void 0 ? void 0 : studioData.name,
                link: studioData === null || studioData === void 0 ? void 0 : studioData.link,
            },
            select: {
                id: true,
                channelPartnerId: true,
                name: true,
                link: true
            }
        });
        return { status: true, data: updatedStudio };
    }
    catch (error) {
        console.error('Error Finding stores:', error);
        return { status: false, error: error };
    }
});
exports.updateStudioForStudioId = updateStudioForStudioId;
// export const updateStudioForChannelPartnerEmail = async(studioData: UpdateStudioInterface, channelPartnerEmail: string) => {
//   try {
//     const channelPartner = await prisma.channelPartner.findFirst({
//       where: {
//         email: channelPartnerEmail
//       },
//       include: {
//         Studio: true
//       }
//     });
//     if (!channelPartner || !channelPartner.Studio) {
//       console.log("Channel Partner or Studio not found");
//       return null;
//     }
//     const updatedStudio = await prisma.studio.update({
//       where: {
//         id: channelPartner.Studio[0].id
//       },
//       data: {
//         name: studioData?.name,
//         link: studioData?.link,
//       },
//       select: {
//         id: true,
//         channelPartnerId: true,
//         name: true,
//         link: true
//       }
//     })
//     return {status: true, data: updatedStudio};
//   } catch(error) {
//     console.error('Error Finding stores:', error);
//     return {status: false, error: error}
//   }
// }
// export const updateStudioForChannelPartnerId = async(studioData: UpdateStudioInterface, channelPartnerId: number) => {
//   try {
//     const channelPartner = await prisma.channelPartner.findFirst({
//       where: {
//         id: channelPartnerId
//       },
//       include: {
//         Studio: true
//       }
//     });
//     if (!channelPartner || !channelPartner.Studio) {
//       console.log("Channel Partner or Store not found");
//       return null;
//     }
//     const updatedStore = await prisma.store.update({
//       where: {
//         id: channelPartner?.Studio[0]?.id
//       },
//       data: {
//         name: studioData?.name,
//         link: studioData?.link,
//       },
//       select: {
//         id: true,
//         channelPartnerId: true,
//         name: true,
//         link: true
//       }
//     })
//     return {status: true, data: updatedStore};
//   } catch(error) {
//     console.error('Error Finding stores:', error);
//     return {status: false, error: error}
//   }
// }
const deleteStudioById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.studio.delete({
            where: {
                id: id
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error Deleting store:', error);
        return { status: false, error: error };
    }
});
exports.deleteStudioById = deleteStudioById;
