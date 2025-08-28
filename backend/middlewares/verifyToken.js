import jwt from "jsonwebtoken"
export const verifyToken = async (req, res, next) => {
    const token = req.cookies.authToken

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - no token provided" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) res.status(401).json({ success: false, message: "Unauthorized - Invalid token" })


        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log("Error in verifyToken", error);
        return res.status(500).json({ message: false, message: "Server Error" })
    }
}