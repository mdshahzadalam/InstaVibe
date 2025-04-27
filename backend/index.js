import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messagesRoute from "./routes/message.route.js";
import { app , server} from "./socket/socket.js";
import path from 'path';

dotenv.config({});

// const app = express();

// const PORT = process.env.PORT || 3000;

const PORT = process.env.PORT || 5173;

const __dirname = path.resolve();

// console.log(__dirname);


// app.get("/", (req, res) => {
//     return res.status(200).json({
//         message: "shahzad alam",
//         success: true
//     })
// })

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// const corsOptions = {
//     origin: ['http://localhost:5173', 'http://localhost:3000'],

//     // method: ["POST", "GET", ],
//     withCredentials: true,
//     // allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
//     allowedHeaders: ['Content-Type', 'Authorization'],
// }

const corsOptions = {
    // origin: 'http://localhost:5173',  // Replace with your frontend URL
    origin: process.env.URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Methods allowed
    allowedHeaders: ['Content-Type', 'Authorization'],  // Add more headers as needed
    credentials: true,  // Allow credentials (cookies, auth headers, etc.)
};

app.use(cors(corsOptions));



//create your api here

app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messagesRoute);


app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})


server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})




