import Redis from "ioredis";

class RedisClient {
    #redisClient;
    constructor(){
        this.#redisClient = null;
    }
    setConfig(
        {
            redisPort,
            redisHost,
            redisPassword,
            redisUsername
        }
    ) {
        this.#redisClient = new Redis(
            {
                host: redisHost,
                port: redisPort,
                username: redisUsername,
                password: redisPassword
            }
        );
    }
    connect(){
        this.#redisClient.connect();
    }
    disconnect(){
        this.#redisClient.disconnect();
    }
    isConnected(){
        return this.#redisClient.status === 'ready';
    }
    async set(key, value, expiration) {
        await this.#redisClient.set(key, value, 'EX', expiration);
        console.log(`Set key: ${key}`);
    }
    async get(key) {
        return await this.#redisClient.get(key);
    }
    async del(key) {
        await this.#redisClient.del(key);
    }
    async setWithoutExpiration(key, value) {
        await this.#redisClient.set(key, value);
    }
};

export {RedisClient};