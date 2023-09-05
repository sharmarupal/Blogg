import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes';
import blogRouter from './routes/blog-routes';
import cors from "cors";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

dotenv.config({path:"./.env"})

mongoose
.connect(process.env.MONGO_URI)
.then(() => app.listen(process.env.PORT)).then(() => console.log("Connected to Database and listening to localhost 5000."))
.catch((err) => console.log(err));