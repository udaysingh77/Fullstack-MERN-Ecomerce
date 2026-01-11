import express from "express";
import morgan from "morgan";
import "dotenv/config"
import connectDb from "./database/db.js"



const app = express();

app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.json({
        status: true,
        message: "Server is running"
    })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    connectDb()
    console.log(`Serever is running at http://localhost:${PORT}`)
})

