"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const global_subcategory_functions_1 = require("../db-functions/global-subcategory-functions");
const data = [
    {
        globalCategoryId: 11,
        subCatData: {
            "name": "Mobile Phone",
            "slug": "mobile-phone"
        }
    },
    {
        globalCategoryId: 11,
        subCatData: {
            "name": "Smart Watch",
            "slug": "smart-watch"
        }
    },
    {
        globalCategoryId: 11,
        subCatData: {
            "name": "Tablet",
            "slug": "tablet"
        }
    },
    {
        globalCategoryId: 11,
        subCatData: {
            "name": "Laptops",
            "slug": "laptops"
        }
    },
    {
        globalCategoryId: 9,
        subCatData: {
            "name": "Car Accessories",
            "slug": "car-accessories"
        }
    },
    {
        globalCategoryId: 9,
        subCatData: {
            "name": "Bike Accessories",
            "slug": "Bike-accessories"
        }
    },
    {
        globalCategoryId: 10,
        subCatData: {
            "name": "Makeup Accessories",
            "slug": "makeup-accessories"
        }
    },
    {
        globalCategoryId: 10,
        subCatData: {
            "name": "Watches",
            "slug": "watches"
        }
    },
    {
        globalCategoryId: 12,
        subCatData: {
            "name": "Home Decor",
            "slug": "home-decor"
        }
    },
    {
        globalCategoryId: 12,
        subCatData: {
            "name": "Cleaning Supplies",
            "slug": "cleaning-supplies"
        }
    },
    {
        globalCategoryId: 12,
        subCatData: {
            "name": "Furniture",
            "slug": "furtinure"
        }
    },
    {
        globalCategoryId: 12,
        subCatData: {
            "name": "Lights",
            "slug": "lights"
        }
    },
    {
        globalCategoryId: 14,
        subCatData: {
            "name": "Utensil & Crockrey",
            "slug": "utensil-crockrey"
        }
    },
    {
        globalCategoryId: 14,
        subCatData: {
            "name": "Bakery Tools",
            "slug": "bakery-tools"
        }
    },
    {
        globalCategoryId: 15,
        subCatData: {
            "name": "Shoes",
            "slug": "shoes"
        }
    },
    {
        globalCategoryId: 15,
        subCatData: {
            "name": "Wallet & Purses",
            "slug": "wallet-purses"
        }
    },
    {
        globalCategoryId: 16,
        subCatData: {
            "name": "Kid's Clothes",
            "slug": "kids-clothes"
        }
    },
    {
        globalCategoryId: 16,
        subCatData: {
            "name": "Male's Clothes",
            "slug": "ales-clothes"
        }
    },
    {
        globalCategoryId: 16,
        subCatData: {
            "name": "Female's Clothes",
            "slug": "female-clothes"
        }
    }
];
const test = () => {
    // data.forEach(async(item) => {
    //   const res = await createGlobalSubCategory(item["subCatData"], item["globalCategoryId"]);
    //   console.log(res);
    // })
    (0, global_subcategory_functions_1.getAllGlobalSubCategories)().then(res => console.log(res));
};
test();
