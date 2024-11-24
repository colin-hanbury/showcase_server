import express, { Express, } from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import welcomeRoutes from "../routes/welcome.routes";
import mongoose from "mongoose";
import actionsRoutes from "../routes/actions.routes";


dotenv.config();

const dbURL = process.env.ATLAS_URI || "";
const port = process.env.PORT || 4000;

mongoose.connect(dbURL).then(() =>{
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Mongoose Error:', error);
});

const app: Express = express();

const corsOptions: CorsOptions = {
    origin: "http://localhost:8081"
  };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/welcome", welcomeRoutes);
app.use("/actions", actionsRoutes);

app.listen(port, () => {
    console.log(`[server]: Server is running on port ${port}`);
});