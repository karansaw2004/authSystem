import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import {fileURLToPath} from "url";
import {config} from "dotenv";
config();

const port = process.env.HASHING_PASSWORD_GRPC_PORT || 50052;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefination = protoLoader.loadSync(path.join(__dirname, "../proto/hashingPassword.proto"), {});

const authService = grpc.loadPackageDefinition(packageDefination);

export const hashingPasswordClient = new authService.Auth.hashingPassword.v1.hashingService(`0.0.0.0:${port}`, grpc.credentials.createInsecure());
