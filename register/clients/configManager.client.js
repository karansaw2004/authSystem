import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import {fileURLToPath} from "url";
import {config} from "dotenv";
config();

const port = process.env.CONFIG_MANAGER_GRPC_PORT || 50051;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefination = protoLoader.loadSync(path.join(__dirname, "../proto/configManager.proto"), {});

const authService = grpc.loadPackageDefinition(packageDefination);

export const configManagerClient = new authService.Auth.configManager.v1.authService(`0.0.0.0:${port}`, grpc.credentials.createInsecure());
