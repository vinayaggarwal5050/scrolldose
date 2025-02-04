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
const studio_functions_1 = require("../db-functions/studio-functions");
const data1 = {
    name: "studio 1",
    link: "studio.1"
};
const data2 = {
    name: "studio 2",
    link: "studio.2"
};
const data3 = {
    name: "studio 3",
    link: "studio.3"
};
const channelPartnerId = 38;
const testFn = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log( await createStudioForChannelPartnerId(data3, channelPartnerId) );
    console.log(yield (0, studio_functions_1.getAllStudios)());
    // console.log( await getStudioByStudioId(8));
    // console.log( await getStudioByChannelPartnerId(36));
    // console.log( await getStudioByChannelPartnerEmail("tester3@gmail.com"));
    // console.log(await updateStudioForStudioId({"link": "studio@1", name: "studio-1"}, 7));
    // console.log(await deleteStudioById(9));
});
testFn();
