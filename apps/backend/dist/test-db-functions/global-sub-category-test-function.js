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
const global_subcategory_functions_1 = require("../db-functions/global-subcategory-functions");
const data = [
    {
        globalCategoryId: 6,
        subCatData: {
            "name": "Mobile Phone",
            "slug": "mobile-phone"
        }
    },
    {
        globalCategoryId: 6,
        subCatData: {
            "name": "Smart Watch",
            "slug": "smart-watch"
        }
    },
    {
        globalCategoryId: 6,
        subCatData: {
            "name": "Tablet",
            "slug": "tablet"
        }
    },
    {
        globalCategoryId: 6,
        subCatData: {
            "name": "Laptops",
            "slug": "laptops"
        }
    },
    {
        globalCategoryId: 8,
        subCatData: {
            "name": "Car Accessories",
            "slug": "car-accessories"
        }
    },
    {
        globalCategoryId: 8,
        subCatData: {
            "name": "Bike Accessories",
            "slug": "Bike-accessories"
        }
    },
    {
        globalCategoryId: 9,
        subCatData: {
            "name": "Makeup Accessories",
            "slug": "makeup-accessories"
        }
    },
    {
        globalCategoryId: 9,
        subCatData: {
            "name": "Watches",
            "slug": "watches"
        }
    },
    {
        globalCategoryId: 7,
        subCatData: {
            "name": "Home Decor",
            "slug": "home-decor"
        }
    },
    {
        globalCategoryId: 7,
        subCatData: {
            "name": "Cleaning Supplies",
            "slug": "cleaning-supplies"
        }
    },
    {
        globalCategoryId: 7,
        subCatData: {
            "name": "Furniture",
            "slug": "furtinure"
        }
    },
    {
        globalCategoryId: 7,
        subCatData: {
            "name": "Lights",
            "slug": "lights"
        }
    },
    {
        globalCategoryId: 11,
        subCatData: {
            "name": "Utensil & Crockrey",
            "slug": "utensil-crockrey"
        }
    },
    {
        globalCategoryId: 11,
        subCatData: {
            "name": "Bakery Tools",
            "slug": "bakery-tools"
        }
    },
    {
        globalCategoryId: 10,
        subCatData: {
            "name": "Shoes",
            "slug": "shoes"
        }
    },
    {
        globalCategoryId: 10,
        subCatData: {
            "name": "Wallet & Purses",
            "slug": "wallet-purses"
        }
    },
    {
        globalCategoryId: 10,
        subCatData: {
            "name": "Kid's Clothes",
            "slug": "kids-clothes"
        }
    },
    {
        globalCategoryId: 10,
        subCatData: {
            "name": "Male's Clothes",
            "slug": "ales-clothes"
        }
    },
    {
        globalCategoryId: 10,
        subCatData: {
            "name": "Female's Clothes",
            "slug": "female-clothes"
        }
    }
];
const test = () => {
    data.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, global_subcategory_functions_1.createGlobalSubCategory)(item["subCatData"], item["globalCategoryId"]);
        console.log(res);
    }));
    // getAllGlobalSubCategories().then(res => console.log(res));
};
test();
