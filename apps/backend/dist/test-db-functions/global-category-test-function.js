"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const global_category_functions_1 = require("../db-functions/global-category-functions");
const data = [
    {
        "name": "Uncategorized",
        "slug": "Uncategorized"
    },
    {
        "name": "Electonics",
        "slug": "electronics"
    },
    {
        "name": "Automobile",
        "slug": "automobile"
    },
    {
        "name": "House Hold",
        "slug": "house-hold"
    },
    {
        "name": "Kitchen",
        "slug": "kitchen"
    },
    {
        "name": "Fashion",
        "slug": "fashion"
    },
    {
        "name": "Life Style",
        "slug": "life-style"
    }
];
const test = () => {
    // data.forEach(async(item) => {
    //   await createGlobalCategory(item);
    // })
    (0, global_category_functions_1.getAllGloalCategories)().then(res => console.log(res));
};
test();
