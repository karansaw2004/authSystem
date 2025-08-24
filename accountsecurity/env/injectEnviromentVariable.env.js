import {getCloudConfig} from "../services/cloudConfig.service.js";
import {getDatabaseUrl} from "../services/databaseUrl.service.js";
import {getHmacKey} from "../services/hmacKey.service.js";
import {getRedisConfig} from "../services/redisConfig.service.js";
import {getRedpandaConfig} from "../services/redpandaConfig.service.js";
import {getValidKeys} from "../services/validKeys.service.js";
import {env} from "./index.js"

export async function injectVariable() {
    try {
        const cloudConfig = await getCloudConfig();
        const databaseUrl = await getDatabaseUrl();
        const hmacKey = await getHmacKey();
        const redisConfig = await getRedisConfig();
        const redpandaConfig = await getRedpandaConfig();
        const validKeys = await getValidKeys();
        if (!(Object.keys(cloudConfig).length > 0) &&
            !(Object.keys(databaseUrl).length > 0) &&
            !(Object.keys(hmacKey).length > 0) &&
            !(Object.keys(redisConfig).length > 0) &&
            !(Object.keys(redpandaConfig).length > 0) &&
            validKeys) {
                console.log("problem in loading enviroment varialble");
                process.exit(-1);
        };
        env.setCloudConfig(cloudConfig);
        env.setDatabaseConfig(databaseUrl);
        env.setHmacKey(hmacKey);
        env.setRedisConfig(redisConfig);
        env.setRedpandaConfig(redpandaConfig);
        env.setValidKeys(validKeys);
        console.log("Environment variables injected successfully.");
    } catch (error) {
        console.error("Error injecting environment variables:", error);
        process.exit(-1);
    }
};