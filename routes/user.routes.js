import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { getUsers , getUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/" , getUsers);

userRouter.get("/:id" , authorize , getUser);

userRouter.post("/" , (req, res) => {
    return res.send({
        message: "Create user"
    });
});

userRouter.put("/:id" , (req, res) => {
    return res.send({
        message: "Update user"
    });
});

userRouter.delete("/:id" , (req, res) => {
   return res.send({
       message: "Delete user"
   });
});

export default userRouter ;