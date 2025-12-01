import express, { response } from "express";
import dotenv from 'dotenv';
import cors from "cors";

import routes from './Routers/notesRoutes.js'
import { ConnectDataBase } from "./Config/Db.js";
import rateLimiter from "./MiddleWare/RateLimiter.js";


dotenv.config()


const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors({
    origin: "http://localhost:5173"
}));

//Middleware 
app.use(express.json()); // This middleware will parse JSON bodies: req.body
app.use(rateLimiter);

// simple costum middleware
// app.use((req,response,next)=>{
//     console.log(`res method is ${req.method ? req.method : "not found"} & res URL is ${req.url}`);
//     next();
// })


app.use("/api/notes", routes);


ConnectDataBase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on : ${PORT}`);
    })
})


