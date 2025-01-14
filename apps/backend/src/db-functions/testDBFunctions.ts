import { createSuperadmin, getSuperadminByEmail, getSuperadminById, getAllSuperadmin, updateSuperadmintforId, updateSuperadmintforEmail } from "./superadmin-functions";


//.................super admin funtions..............................................................
const superadminData = {
  "email": "superadmin@gmail.com",
  "password": "superadmin123",
  "name": "Superadmin"
};

const testAdminFunctions = async () => { 
  // const res = await createSuperadmin(superadminData);
  // console.log( await getAllSuperadmin()) ;
  // const res = await getSuperadminByEmail("superadmin@gmail.com");
  // const res = await getSuperadminById(1);
  // console.log( await updateSuperadmintforId({id: 1, name: "new name"}) );
  // console.log( await updateSuperadmintforEmail({email: "admin@gmail.com", name: "admin"}) );
  // console.log( await getAllSuperadmin()) ;

} 

testAdminFunctions();


//............ Products Functions...........................................

type productTye = {
  "name": String,
  "description": String,
  "slug": String,
  "price": Number
}

const product1: productTye = {
  "name": "some product",
  "description": "some description",
  "slug": "some slug",
  "price": 10
}



// console.log(product1);

