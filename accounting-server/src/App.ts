import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import router from "./routes/routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.listen(process.env.PORT!, () => {
  console.log(`Server is running on port ${process.env.PORT!}`);
});
