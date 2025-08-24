import {startHashingPasswordGrpcServer} from "./server/hashingPassword.server.js";
import {config} from "dotenv";
config();

const port = process.env.HASHING_PASSWORD_GRPC_PORT || 50052;

;(async (port) => {
    try {
        startHashingPasswordGrpcServer(port);
    } catch (error) {
        console.log("error in the main starting function of grpc",error.message);
        process.exit(-1);
    }
})(port);