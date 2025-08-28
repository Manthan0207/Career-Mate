import { User } from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies.js";

export const signup = async (req, res) => {
    console.log("HI");

    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            if (!email) {
                throw new Error("All fields are required email")
            }
            if (!password) {
                throw new Error(`All fields are required password ${email}`)
            }
            if (!name) {
                throw new Error("All fields are required name")
            }
        }

        const userAlreadyExist = await User.findOne({ email });
        if (userAlreadyExist) {
            return res.status(400).json({ success: false, message: "User Already Exists" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10) //10 = salt


        const user = new User(
            {
                email,
                password: hashedPassword,
                username: name,
            }
        )

        await user.save() //adding entry in db

        //jwt 
        generateTokenAndSetCookies(res, user._id)



        res.status(200).json({
            success: true,
            message: "User Created",
            user: {
                ...user._doc,
                password: null
            }
        })


    } catch (error) {
        console.log("Error : ", error.message);

        res.status(400).json({ success: false, message: error.message })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: " Invalid Credentials" })
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: " Invalid Credentials" })
        }

        generateTokenAndSetCookies(res, user._id)

        user.lastLogin = new Date()

        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log("Error in Login", error);
        res.status(400).json({ success: false, message: error.message })

    }
}
export const checkAuth = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId).select("-password")

        if (!user) return res.status(400).json({ success: false, message: "User not found" })

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log("Error in checkAuth", error);
        res.status(400).json({ success: false, message: error.message })

    }
}