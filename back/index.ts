import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { authRouter } from "./routes/auth";
import { postRouter } from "./routes/post";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb" }));

app.use("/", postRouter);
app.use("/", authRouter);

mongoose
  .connect(process.env.REACT_APP_MONGOOSE_URL!)
  .then(() => app.listen(5000))
  .catch((err) => console.log("ERROR CONNECTION", err));
