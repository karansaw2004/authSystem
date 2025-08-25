import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import {fileURLToPath} from "url";
import {services} from "../e/tokenVerificationAdapter.service.js";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefinition = protoLoader.loadSync(path.join(__dirname, "../proto/tokenVerificationAdapter.proto"), {});

const proto = grpc.loadPackageDefinition(packageDefinition);

export function startServer(port) {
    try {
        const server = new grpc.Server();
        server.addService(proto.TokenVerificationService.service, services);
        server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
            if (error) {
                console.error("Error binding gRPC server:", error);
                process.exit(-1);
            }
            console.log(`gRPC server started on port ${port} and also in localhost:${port}`);
        });
    } catch (error) {
        console.error("Error starting gRPC server:", error);
        process.exit(-1);
    }
}