"use strict";
// import {
//   createProductForStoreId,
//   getAllProducts,
//   getproductsByChannelPartnerId,
//   getProductByProductId,
//   getProductsByStoreId,
//   getProductsByStoreName,
//   getProductsByStoreSlug,
//   updateProductByProductId,
// } from "../db-functions/product-functions";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const productData1 = {
    name: "Universal Travel Adapter",
    description: "International All in One Worldwide Travel Adapter and Wall Charger with USB Ports with Multi Type Power Outlet USB 2.1A,100-250 Voltage Travel Charger",
    price: "588",
    image: "https://m.media-amazon.com/images/I/61t7eIbAxwL._SL1200_.jpg",
    link: "https://amzn.to/4ad13Fx",
    category: "Trending",
    slug: "universal-travel-adapter",
    video: "https://www.youtube.com/embed/Efr7C3Wu7_M",
    tag: "power converter,universal socket,universal travel adopter"
};
const productData2 = {
    "name": "Bedtime Fun Kids Slide Projector Torch",
    "description": "Bedtime Fun Kids Slide Projector Torch, Premium ABS Materials, Easy-to-Use Interchangeable Slides, Versatile Flashlight for Nighttime Safety, The Perfect Sleep Companion for Children",
    "price": "₹199",
    "image": "https://m.media-amazon.com/images/I/61fu2vtWH4L._SY879_.jpg",
    "link": "https://amzn.to/3Wa29Ms",
    "category": "Kids",
    "slug": "bedtime-fun-kids-slide-projector-torch",
    "video": "https://www.youtube.com/embed/gnuOkWnk6vQ",
    "tag": "project torch,torch with slides,story telling torch"
};
const testStoreFunctions = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log( await createProductForStoreId(productData2, 2) );
    // console.log( await getAllProducts() );
    // console.log( await getProductById(1) );
    // console.log( await getProductsByStoreId(1) );
    // console.log( await getProductsByStoreSlug("bulkmart") );
    // console.log( await getProductsByStoreName("Wenomad") );
    // console.log( await getproductsByChannelPartnerId(4) );
    // console.log( await updateProductByProductId({name: "Universal Travel Power Adapter / Socket"}, 1) );
    // console.log( await getProductByProductId(1) );
});
testStoreFunctions();
