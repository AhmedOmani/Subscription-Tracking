import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true , "User name is required"],
        trim: true,
        minLength: 2,
        maxLength: 20,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "User Email is required"],
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: [true , "User Password is required"],
        minLength: 6,

    },
} , {timestamps: true});

const User = mongoose.model("User" , userSchema);

export default User;