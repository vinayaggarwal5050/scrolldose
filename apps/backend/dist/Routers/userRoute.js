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
exports.userRouter = void 0;
const express_1 = require("express");
const user_funtions_1 = require("../db-functions/user-funtions");
const user_mw_1 = require("./middlewares/user.mw");
// import { validateCreateUser } from "./middlewares/User.mw";
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/user
    //http://localhost:6000/api/v1/user?useremail=User@gmail.com
    //http://localhost:6000/api/v1/user?userid=3
    const userEmail = req.query.useremail;
    const userId = parseInt(req.query.userid);
    let data;
    if (userEmail) {
        data = yield (0, user_funtions_1.getUserByUserEmail)(userEmail);
    }
    else if (userId) {
        data = yield (0, user_funtions_1.getUserByUserId)(userId);
    }
    else {
        data = yield (0, user_funtions_1.getAllUsers)();
    }
    res.status(200).json({
        status: true,
        data: data,
        msg: "/api/v1/user"
    });
}));
exports.userRouter.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/user/create
    try {
        const data = yield (0, user_funtions_1.createUser)(req.body);
        res.status(200).json({
            status: true,
            data: data,
            msg: "/api/v1/user/create"
        });
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some error",
            error: error
        });
    }
}));
exports.userRouter.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/user/update?useremail=test@gmail.com
    //http://localhost:6000/api/v1/user/update?id=3
    try {
        const userEmail = req.query.useremail;
        const userId = parseInt(req.query.userid);
        if (userEmail) {
            const data = yield (0, user_funtions_1.updateUserForUserEmail)(req.body, userEmail);
            res.status(200).json({
                status: "true",
                data: data,
                msgFrom: "api/v1/super-user/update/useremail",
                msg: "User Updated Successfully"
            });
        }
        else if (userId) {
            const data = yield (0, user_funtions_1.updateUserForUserId)(req.body, userId);
            res.status(200).json({
                status: "true",
                data: data,
                msgFrom: "api/v1/super-user/update/userid",
                msg: "User Updated Successfully"
            });
        }
        else {
            res.status(200).json({
                status: false,
                msg: "invalid input"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some error",
            error: error
        });
    }
}));
exports.userRouter.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/user/delete?useremail=test@gmail.com
    //http://localhost:6000/api/v1/user/delete?userid=4
    try {
        const userEmail = req.query.useremail;
        const userId = parseInt(req.query.userid);
        if (userEmail) {
            const data = yield (0, user_funtions_1.deleteUserForUserEmail)(userEmail);
            res.status(200).json({
                status: "true",
                data: data,
                msg: "api/v1/super-user/update/email"
            });
        }
        else if (userId) {
            const data = yield (0, user_funtions_1.deleteUserForUserId)(userId);
            res.status(200).json({
                status: "true",
                data: data,
                msg: "api/v1/super-user/update/id"
            });
        }
        else {
            res.status(200).json({
                status: false,
                msg: "invalid input"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some error",
            error: error
        });
    }
}));
// userRouter.post("/signin", async(req: Request, res: Response) => {
//   const { userEmail, userPassword } = req.body;
//   if(!userEmail || !userPassword) {
//     res.status(200).json({
//       status: false,
//       msg: "invalid data",
//       msgFrom: "api/v1/user/signin/invalid-data"
//     })
//     return;
//   }
//   const userData:any = await getUserByUserEmail(userEmail);
//   if(!userData) {
//     res.status(200).json({
//       status: false,
//       msg: "User with Given Email Does Not Exists",
//       msgFrom: "api/v1/user/signin/invalid-email"
//     })
//     return;
//   }
//   if(userData.userPassword !== userPassword) {
//     res.status(200).json({
//       status: false,
//       msg: "Invalid Password",
//       msgFrom: "api/v1/user/signin/invalid-password"
//     })
//     return;
//   }
//   const userJWT = "9SFUSM2342FSDF"
//   res.status(200).json({
//     status: true,
//     data: {...userData, userJWT},
//     msg: "Login Successful",
//     msgFrom: "api/v1/user/signin/success"
//   })
//   return;
// })
exports.userRouter.post("/signin", user_mw_1.userSignInAuth, (req, res) => {
    res.status(200).json({
        status: true,
        msg: "signed in"
    });
});
exports.userRouter.post('/profile', user_mw_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, userEmail } = req.body;
    const data = yield (0, user_funtions_1.getUserByUserId)(parseInt(userId));
    res.status(200).json({
        status: true,
        data: data,
        msg: "api/v1/user/profile"
    });
}));
exports.userRouter.get('/wishlist', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.query.userid);
        if (userId) {
            const userData = yield (0, user_funtions_1.getUserWishedProductsByUserId)(userId);
            res.status(200).json({
                status: true,
                data: userData,
                msg: "wishlist fetched successfull"
            });
        }
        else {
            res.status(200).json({
                status: false,
                msg: "invalid user id",
                msgFrom: "/api/v1/user/wishlist/userid"
            });
        }
    }
    catch (err) {
        res.status(200).json({
            status: false,
            msg: "some eroor"
        });
    }
}));
exports.userRouter.get('/wishlist/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.query.userid);
        const productId = parseInt(req.query.productid);
        if (!userId || !productId) {
            res.status(200).json({
                status: false,
                msg: "userId or productId not found"
            });
            return;
        }
        const wishlist = yield (0, user_funtions_1.addProductIdToUserWishList)(userId, productId);
        res.status(200).json({
            status: true,
            data: wishlist,
            msg: "Product added to wishlist successfully"
        });
    }
    catch (err) {
        res.status(200).json({
            status: false,
            msg: "some eroor"
        });
    }
}));
exports.userRouter.get('/wishlist/remove', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.query.userid);
        const productId = parseInt(req.query.productid);
        if (!userId || !productId) {
            res.status(200).json({
                status: false,
                msg: "userId or productId not found"
            });
            return;
        }
        const wishlist = yield (0, user_funtions_1.removeProductIdToUserWishList)(userId, productId);
        res.status(200).json({
            status: true,
            data: wishlist,
            msg: "Product removed from wishlist successfully"
        });
    }
    catch (err) {
        res.status(200).json({
            status: false,
            msg: "some eroor"
        });
    }
}));
