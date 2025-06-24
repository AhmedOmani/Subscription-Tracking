import { Router } from "express";

const userRouter = Router();

userRouter.get("/" , (req , res) => {
    return res.send({
        messages: "GET all users"
    });
})

userRouter.get("/:id" , (req , res) => {
    return res.send({
        message: "Get a user"
    });
});

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