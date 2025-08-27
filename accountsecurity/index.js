import {masterRoute} from "./routes/master.route.js";
import {database} from "./database/connect.database.js";
import {injectVariable} from "./env/injectEnviromentVariable.env.js";
import {securityManager} from "./security/securityManager.security.js";
import {env} from "./env/index.js";
import {redis,redpanda} from "./config/index.js";
import fastify from "fastify";
import {config} from "dotenv";
import {s3} from "./helpers/s3.helper.js";
config();


const app = fastify();
const PORT = process.env.PORT || 3004;

app.register(masterRoute,{prefix:"/auth/api/v1"});

;(async () => {
    try {
        await injectVariable();
        database.setDatabaseConfig(env.getDatabaseConfig());
        await database.connect();
        securityManager.setConfig(env.getValidKeys());
        redis.setConfig(env.getRedisConfig());
        redpanda.setConfig(env.getRedpandaConfig());
        redpanda.createProducer();
        s3.setCloudConfig(env.getCloudConfig());
        s3.setBucketName(env.getS3Config());
        await redpanda.connectProducer();
        app.listen({port: PORT});
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        await database.disconnect();
        redis.disconnect();
        await redpanda.disconnectProducer();
        console.error("Error starting server:", error);
    }
})();