import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
import authRouter from './routes/authRoutes.js'
import { connectDatabase } from './db/connectDB.js'
import cors from 'cors'


const app = express()

dotenv.config()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true //to send cookies in the request from frontend
}))
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRouter)


app.listen(3000, () => {
    connectDatabase();
    console.log("Server listening on 3000");
})