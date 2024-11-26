import { Application, urlencoded,json } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../swagger/swagger_output.json";
import { DatabaseConnection } from "../infrastructure/database.connection";
import container from "./inversify.config";



export async function serverConfig(app: Application) {
    app.use(
      urlencoded({
        extended: true,
      })
    );
    app.use(json());
    app.use(cors());
    app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
    const database = container.get(DatabaseConnection);
    await database.initConnection();
    database.setAutoReconnect();
}