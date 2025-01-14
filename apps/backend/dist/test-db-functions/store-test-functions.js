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
const store_functions_1 = require("../db-functions/store-functions");
const storeData1 = {
    name: "Bulkmart",
    slug: "bulkmart"
};
const storeData2 = {
    name: "Wenomad",
    slug: "wenomad"
};
const storeData3 = {
    name: "Ziphy",
    slug: "ziphy"
};
const channelPartnerId = 3;
const testStoreFunctions = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log( await createStore(storeData2, channelPartnerId) );
    console.log(yield (0, store_functions_1.getAllStores)());
    // console.log(await getStoreById(2));
    // console.log(await getStoreByChannelPartnerId(4));
    // console.log(await getStoreByChannelPartnerEmail("secondpartner@gmail.com"));
    // console.log( await updateStoreForId({name: "BULKMART", slug: "bulkmart"}, 1) )
    // console.log( await updateStoreForChannelPartnerEmail( {name: "new store", slug: "new-slug"}, "secondpartner@gmail.com") )
});
testStoreFunctions();
