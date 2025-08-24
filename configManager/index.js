import {startConfigManagerGrpcServer} from "./server/configManager.server.js";
import {config} from "dotenv";
config();

const port = process.env.CONFIG_MANAGER_GRPC_PORT || 50051;

;(async (port) => {
    try {
        startConfigManagerGrpcServer(port);
    } catch (error) {
        console.log("error in the main starting function of grpc",error.message);
        process.exit(-1);
    }
})(port);