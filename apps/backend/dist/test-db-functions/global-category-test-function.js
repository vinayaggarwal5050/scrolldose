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
    data.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, global_category_functions_1.createGlobalCategory)(item);
    }));
    (0, global_category_functions_1.getAllGloalCategories)().then(res => console.log(res));
};
test();
