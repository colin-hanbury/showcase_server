import dotenv from "dotenv";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./config/inversify.config";
import { serverConfig } from "./config/server.config";

export async function Bootstrap() {
    const server = new InversifyExpressServer(container);
    
    dotenv.config();

    const port = process.env.PORT || 8080;

    server.setConfig(serverConfig);

    const app = server.build();
    app.listen(port, () =>
        console.log(`Server started on ${port}`)
    );
}
 
Bootstrap();