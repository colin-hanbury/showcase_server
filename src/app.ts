import express, { Express, Request } from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {routes} from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";



dotenv.config();

const dbURL = process.env.ATLAS_URI || "";
const port = process.env.PORT || 4000;

mongoose.connect(dbURL).then(() =>{
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Mongoose Error:', error);
});

const app: Express = express();

// const corsOptions: CorsOptions = {
//     origin: "http://localhost:4000"
//   };
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerOutput));


app.listen(port, () => {
    console.log(`[server]: Server is running on port ${port}`);
});

export default app;