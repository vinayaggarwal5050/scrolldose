import { createStore, getAllStores, getStoreById, getStoreByChannelPartnerId, deleteStoreById, getStoreByChannelPartnerEmail, updateStoreForChannelPartnerEmail, updateStoreForId } from "../db-functions/store-functions"

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

const testStoreFunctions = async() => {
  // console.log( await createStore(storeData2, channelPartnerId) );
  console.log( await getAllStores());
  // console.log(await getStoreById(2));
  // console.log(await getStoreByChannelPartnerId(4));
  // console.log(await getStoreByChannelPartnerEmail("secondpartner@gmail.com"));
  // console.log( await updateStoreForId({name: "BULKMART", slug: "bulkmart"}, 1) )
  // console.log( await updateStoreForChannelPartnerEmail( {name: "new store", slug: "new-slug"}, "secondpartner@gmail.com") )
}

testStoreFunctions();