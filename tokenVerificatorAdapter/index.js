
import {startServer} from "./server/tokenVerificationAdapter.server.js";
import {injectVariable} from "./env/injectEnviromentVariable.env.js";
import {securityManager} from "./security/securityManager.security.js";
import {env} from "./env/index.js";
import {redis,redpanda} from "./config/index.js";
import {config} from "dotenv";
config();




;(async () => {
    try {
        await injectVariable();
        securityManager.setConfig(env.getValidKeys());
        redis.setConfig(env.getRedisConfig());
        redpanda.setConfig(env.getRedpandaConfig());
        redpanda.createProducer();
        await redpanda.connectProducer();
        startServer(3001);
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        redis.disconnect();
        await redpanda.disconnectProducer();
        console.error("Error starting server:", error);
    }
})();