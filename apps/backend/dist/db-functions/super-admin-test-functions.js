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
//.................super admin funtions..............................................................
const superadminData = {
    "email": "superadmin@gmail.com",
    "password": "superadmin123",
    "name": "Superadmin"
};
const testAdminFunctions = () => __awaiter(void 0, void 0, void 0, function* () {
    // const res = await createSuperadmin(superadminData);
    // console.log( await getAllSuperadmin()) ;
    // const res = await getSuperadminByEmail("superadmin@gmail.com");
    // const res = await getSuperadminById(1);
    // console.log( await updateSuperadmintforId({id: 1, name: "new name"}) );
    // console.log( await updateSuperadmintforEmail({email: "admin@gmail.com", name: "admin"}) );
    // console.log( await getAllSuperadmin()) ;
});
testAdminFunctions();
const product1 = {
    "name": "some product",
    "description": "some description",
    "slug": "some slug",
    "price": 10
};
// console.log(product1);
