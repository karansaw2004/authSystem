import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import {fileURLToPath} from "url";
import {services} from "../services/hashingPassword.service.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefination = protoLoader.loadSync(path.join(__dirname,"../proto/hashingPassword.proto"),{});
const proto = grpc.loadPackageDefinition(packageDefination);


export function startHashingPasswordGrpcServer(port) {
    try {
        const server = new grpc.Server();
        server.addService(proto.Auth.hashingPassword.v1.hashingService.service, services);
        server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err,address) => {
            if (err) {
                console.log("error in the main start function of the start hashing password grpc server", err.message);
                process.exit(-1);
            };
            console.log(`Hashing Password gRPC server running at ${address} and on localhost:${port}`);
        });
    } catch (error) {
        console.log("error in the main start function of the start hashing password grpc server",error.message);
        process.exit(-1);
    };
};