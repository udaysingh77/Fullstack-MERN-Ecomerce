import express from "express";
import morgan from "morgan";
import "dotenv/config";
import connectDb from "./database/db.js";
import userRoute from "./routes/user.js";
import cors from "cors";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);

app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Server is running",
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  connectDb();
  console.log(`Serever is running at http://localhost:${PORT}`);
});
