import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import {fileURLToPath} from "url";
import path from "path";
import {services} from "../services/configManager.service.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefination = protoLoader.loadSync(path.join(__dirname,"../proto/configManager.proto"),{});
const proto = grpc.loadPackageDefinition(packageDefination);

export function startConfigManagerGrpcServer(port) {
    try {
        const server = new grpc.Server();
        server.addService(proto.Auth.configManager.v1.authService.service,services);
        server.bindAsync(`0.0.0.0:${port}`,grpc.ServerCredentials.createInsecure(),(err,address)=>{
            if (err) {
                console.log("error in the bind async function of start grpc server",err.message);
                process.exit(-1);
            };
            console.log("server startted at",address,"and also at localhost:",port);
        })
    } catch (error) {
        console.log('error in the main start config manager grpc function',error.message);
        process.exit(-1);
    }
}