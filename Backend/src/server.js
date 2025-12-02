import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import routes from "./Routers/notesRoutes.js";
import { ConnectDataBase } from "./Config/Db.js";
import rateLimiter from "./MiddleWare/RateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    );
}

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", routes);

// -------------------------------
// PRODUCTION SETUP FIXED
// -------------------------------
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
    });
}

ConnectDataBase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on : ${PORT}`);
    });
});
