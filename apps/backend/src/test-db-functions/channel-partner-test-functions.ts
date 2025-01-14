import { getAllChannelPartners, getChannelPartnerByEmail, getChannelPartnerById, createChannelPartner, updateChannelPartnerforEmail,  updateChannelPartnerforId, deleteChannelPartnerByEmail, deleteChannelPartnerById } from "../db-functions/channel-partner-functions"

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

const testChannelPartnerFunctions = async () => { 
  // console.log( await createChannelPartner(channelPartnerData2) );
  // console.log( await getAllChannelPartners() );
  console.log( await getChannelPartnerByEmail("channelpartner@gmail.com") );
  // console.log( await getChannelPartnerById(4) );
  // console.log( await updateChannelPartnerforEmail({"email": "channelpartner@gmail.com", "name": "new channel partner name"}));
  // console.log( await updateChannelPartnerforId({"id": 2, "password": "new password"}));
  // console.log( await deleteChannelPartnerByEmail("channelpartner@gmail.com") );
  // console.log( await deleteChannelPartnerById(2));

} 

testChannelPartnerFunctions();