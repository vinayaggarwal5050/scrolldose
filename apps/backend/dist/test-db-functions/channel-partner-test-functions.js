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
const channel_partner_functions_1 = require("../db-functions/channel-partner-functions");
//.................super admin funtions..............................................................
const channelPartnerData1 = {
    "email": "channelpartner@gmail.com",
    "password": "channelpartner@123",
    "name": "Channel Partner"
};
const channelPartnerData2 = {
    "email": "secondpartner@gmail.com",
    "password": "second@partner",
    "name": "Second Partner"
};
const testChannelPartnerFunctions = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log( await createChannelPartner(channelPartnerData2) );
    // console.log( await getAllChannelPartners() );
    console.log(yield (0, channel_partner_functions_1.getChannelPartnerByEmail)("channelpartner@gmail.com"));
    // console.log( await getChannelPartnerById(4) );
    // console.log( await updateChannelPartnerforEmail({"email": "channelpartner@gmail.com", "name": "new channel partner name"}));
    // console.log( await updateChannelPartnerforId({"id": 2, "password": "new password"}));
    // console.log( await deleteChannelPartnerByEmail("channelpartner@gmail.com") );
    // console.log( await deleteChannelPartnerById(2));
});
testChannelPartnerFunctions();
