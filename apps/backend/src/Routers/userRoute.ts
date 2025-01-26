import { Router, Request, Response, response } from "express";
import  { UserInterface, createUser, getAllUsers, getUserByUserEmail, getUserByUserId, updateUserForUserEmail, updateUserForUserId, deleteUserForUserEmail, deleteUserForUserId, getUserWishedProductsByUserId, addProductIdToUserWishList, removeProductIdToUserWishList } from "../db-functions/user-funtions"
import { userAuth, userSignInAuth } from "./middlewares/user.mw";
// import { validateCreateUser } from "./middlewares/User.mw";

export const userRouter = Router();


userRouter.get('/', async (req: Request, res: Response) => {
  //http://localhost:6000/api/v1/user
  //http://localhost:6000/api/v1/user?useremail=User@gmail.com
  //http://localhost:6000/api/v1/user?userid=3

  const userEmail = req.query.useremail as string;
  const userId = parseInt(req.query.userid as string);
  let data;

  if(userEmail) {
    data = await getUserByUserEmail(userEmail);
  } else if(userId) {
    data = await getUserByUserId(userId);
  } else {
    data = await getAllUsers();
  }

   res.status(200).json({
    status: true,
    data: data,
    msg: "/api/v1/user"
  })
  
})

userRouter.post('/create', async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/user/create

  try {
    const data = await createUser(req.body);
    res.status(200).json({
      status: true,
      data: data,
      msg: "/api/v1/user/create"
    })

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some error",
      error: error
    })
  }

  
})

userRouter.put('/update', async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/user/update?useremail=test@gmail.com
  //http://localhost:6000/api/v1/user/update?id=3
  try {
    const userEmail = req.query.useremail as string;
    const userId = parseInt(req.query.userid as string);

    if(userEmail) {
      const data = await updateUserForUserEmail(req.body, userEmail)
      res.status(200).json({
        status: "true",
        data: data,
        msgFrom: "api/v1/super-user/update/useremail",
        msg: "User Updated Successfully"
      })

    } else if (userId) {
      const data = await updateUserForUserId(req.body, userId);
      res.status(200).json({
        status: "true",
        data: data,
        msgFrom: "api/v1/super-user/update/userid",
        msg: "User Updated Successfully"
      })
      
    } else {
      res.status(200).json({
        status: false,
        msg: "invalid input"
      })
    }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some error",
      error: error
    })
  }
})

userRouter.delete('/delete', async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/user/delete?useremail=test@gmail.com
  //http://localhost:6000/api/v1/user/delete?userid=4
  try {
    const userEmail = req.query.useremail as string;
    const userId = parseInt(req.query.userid as string);

    if(userEmail) {
      const data = await deleteUserForUserEmail(userEmail);
      res.status(200).json({
        status: "true",
        data: data,
        msg: "api/v1/super-user/update/email"
      })

    } else if(userId) {
      const data = await deleteUserForUserId(userId);

      res.status(200).json({
        status: "true",
        data: data,
        msg: "api/v1/super-user/update/id"
      })

    } else {
      res.status(200).json({
        status: false,
        msg: "invalid input"
      })
    }


  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some error",
      error: error
    })
  }

})


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

userRouter.post("/signin", userSignInAuth, (req: Request, res: Response) => {

  res.status(200).json({
    status: true,
    msg: "signed in"
  })
})

userRouter.post('/profile', userAuth, async (req: Request, res: Response) => {
    const { userId, userEmail } = req.body;
    const data = await getUserByUserId(parseInt(userId));
    
  res.status(200).json({
    status: true,
    data: data,
    msg: "api/v1/user/profile"
  })
})

userRouter.get('/wishlist', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.query.userid as string);
    if(userId) {
      const userData:any = await getUserWishedProductsByUserId(userId);
      const wishlist = userData.userWishedProducts;
      res.status(200).json({
        status: true,
        data: wishlist,
        msg: "wishlist fetched successfull"
      })

    } else {
      res.status(200).json({
        status: false,
        msg: "invalid user id",
        msgFrom: "/api/v1/user/wishlist/userid"
      })
    }


  } catch(err) {
    res.status(200).json({
      status: false,
      msg: "some eroor"
    })
  }
})

userRouter.get('/wishlist/add', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.query.userid as string);
    const productId = parseInt(req.query.productid as string);

    if(!userId || !productId) {
      res.status(200).json({
        status: false,
        msg: "userId or productId not found"
      })
      return;
    }

    const wishlist = await addProductIdToUserWishList(userId, productId);

    res.status(200).json({
      status: true,
      data: wishlist,
      msg: "Product added to wishlist successfully"
    })

  } catch(err) {
    res.status(200).json({
      status: false,
      msg: "some eroor"
    })
  }
})

userRouter.get('/wishlist/remove', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.query.userid as string);
    const productId = parseInt(req.query.productid as string);

    if(!userId || !productId) {
      res.status(200).json({
        status: false,
        msg: "userId or productId not found"
      })
      return;
    }

    const wishlist = await removeProductIdToUserWishList(userId, productId);

    res.status(200).json({
      status: true,
      data: wishlist,
      msg: "Product removed from wishlist successfully"
    })

  } catch(err) {
    res.status(200).json({
      status: false,
      msg: "some eroor"
    })
  }
})