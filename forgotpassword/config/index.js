import {RedisClient} from "./redis.config.js";
import {RedpandaClient} from "./redpanda.config.js";


export const redis = new RedisClient();
export const redpanda = new RedpandaClient();