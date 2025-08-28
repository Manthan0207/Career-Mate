import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
import authRouters from './routes/authRoutes'
import { connectDatabase } from './db/connectDB'


const app = express()

dotenv.config()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true //to send cookies in the request from frontend
}))
app.use(cookieParser())
app.use(express.json())

app.use('api/auth', authRouters)


app.listen(3000, () => {
    connectDatabase();
    console.log("Server listening on 3000");
})