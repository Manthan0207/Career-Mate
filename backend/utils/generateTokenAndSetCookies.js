import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const generateTokenAndSetCookies = async (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    res.cookie("authToken", token,
        {
            httpOnly: true, // cookie can not be accessed by client side js , prevents XSS attack ,
            secure: process.env.NODE_ENV === 'production',  //it will be https in production while development is http
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    )

    return token
}