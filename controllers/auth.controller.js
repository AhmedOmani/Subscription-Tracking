import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {JWT_SECRET , JWT_EXPIRES_IN} from "../config/env.js";

import  User  from "../models/user.model.js";

export const signUp = async (req , res , next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const { name , email , password } = req.body;

        //Check if user exists
        const existingUser = await User.findOne({  email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        //Create user and generate the token
        const newUser = await User.create([{name , email , password: hashedPassword}] , {session});
        const token = jwt.sign({userId: newUser[0]._id } , JWT_SECRET , {expiresIn: JWT_EXPIRES_IN});

        //End the session
        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                token,
                user: newUser[0]
            }
        });

    } catch(error) {
        console.log("here?")
        await session.abortTransaction();
        session.endSession();
        console.log(next(error));
        next(error);
        console.log("?????");
    }
};
export const signIn = async (req, res , next) => {
    try {
        const {email , password} = req.body;

        //Check if user exists.
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            const error = new Error("User not found");
            error.statusCode = 400;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password , existingUser.password);
        if (!isPasswordValid) {
            const error =  new Error("Email or password are incorrect");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userId: existingUser._id} , JWT_SECRET , {expiresIn: JWT_EXPIRES_IN});

        return res.status(200).json( {
            success: true ,
            message: "User signed in successsfully",
            data: {
                token,
                user: existingUser
            }
        });

    } catch (error) {
        next(error);
    }
};
