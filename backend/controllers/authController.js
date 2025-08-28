import { User } from "../models/UserModel";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
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
                name,
                verificationToken,
                verificationTokenExpiresAt: Date.now() + 24 * 3600 * 1000 //24 hours
            }
        )

        await user.save() //adding entry in db

        //jwt 
        generateTokenAndSetCookie(res, user._id)



        res.status(200).json({
            success: true,
            message: "User Created",
            user: {
                ...user._doc,
                password: null
            }
        })


    } catch (error) {
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

        generateTokenAndSetCookie(res, user._id)

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