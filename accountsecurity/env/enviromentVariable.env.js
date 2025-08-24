class EnvironmentVariable {
    #region;
    #bucketName;
    #accessKeyId;
    #secretAccessKey;
    #connectionUrl;
    #redisPort;
    #redisHost;
    #redisPassword;
    #redisUsername;
    #hmacKey;
    #redpandaClientId;
    #redpandaBrokers;
    #oldAccessTokenKeyVersion;
    #oldRefreshTokenKeyVersion;
    #oldDeviceFingerPrintKeyVersion;
    #oldAccessTokenKey;
    #oldRefreshTokenKey;
    #oldDeviceFingerPrintKey;
    #newAccessTokenKeyVersion;
    #newRefreshTokenKeyVersion;
    #newDeviceFingerPrintKeyVersion;
    #newAccessTokenKey;
    #newRefreshTokenKey;
    #newDeviceFingerPrintKey;

    constructor() {
        this.#bucketName = null;
        this.#accessKeyId = null;
        this.#secretAccessKey = null;
        this.#connectionUrl = null;
        this.#redisPort = null;
        this.#redisHost = null;
        this.#redisPassword = null;
        this.#redisUsername = null;
        this.#hmacKey = null;
        this.#redpandaClientId = null;
        this.#redpandaBrokers = null;
        this.#oldAccessTokenKeyVersion = null;
        this.#oldRefreshTokenKeyVersion = null;
        this.#oldDeviceFingerPrintKeyVersion = null;
        this.#oldAccessTokenKey = null;
        this.#oldRefreshTokenKey = null;
        this.#oldDeviceFingerPrintKey = null;
        this.#newAccessTokenKeyVersion = null;
        this.#newRefreshTokenKeyVersion = null;
        this.#newDeviceFingerPrintKeyVersion = null;
        this.#newAccessTokenKey = null;
        this.#newRefreshTokenKey = null;
        this.#newDeviceFingerPrintKey = null;

    }
    setCloudConfig(
        {
            accessKeyId, 
            secretAccessKey, 
            region, 
            bucketName
        }
    ) {
        this.#accessKeyId = accessKeyId;
        this.#secretAccessKey = secretAccessKey;
        this.#region = region;
        this.#setS3Config(bucketName);
    }
    #setS3Config(
        bucketName
    ) {
        this.#bucketName = bucketName;
    }
    setRedisConfig(
        {
            port,
            host,
            password,
            username
        }
    ) {
        this.#redisPort = port;
        this.#redisHost = host;
        this.#redisPassword = password;
        this.#redisUsername = username;
    }
    setHmacKey(
        {
            hmacKey
        }
    ) {
        this.#hmacKey = hmacKey;
    }
    setRedpandaConfig(
        {
            clientId, 
            brokers
        }
    ) {
        this.#redpandaClientId = clientId;
        this.#redpandaBrokers = brokers;
    }
    setDatabaseConfig(
        {
            connectionUrl
        }
    ) {
        this.#connectionUrl = connectionUrl;
    }
    setValidKeys(
        {
        oldAccessTokenKey,
        oldRefreshTokenKey,
        newAccessTokenKey, 
        newRefreshTokenKey,
        oldAccessTokenKeyVersion, 
        oldRefreshTokenKeyVersion,
        newAccessTokenKeyVersion, 
        newRefreshTokenKeyVersion,
        oldDeviceFingerPrintKeyVersion, 
        newDeviceFingerPrintKeyVersion,
        oldDeviceFingerPrintKey, 
        newDeviceFingerPrintKey,
    }
    ) {
        this.#oldAccessTokenKey = oldAccessTokenKey;
        this.#oldRefreshTokenKey = oldRefreshTokenKey;
        this.#oldDeviceFingerPrintKey = oldDeviceFingerPrintKey;
        this.#newAccessTokenKey = newAccessTokenKey;
        this.#newRefreshTokenKey = newRefreshTokenKey;
        this.#newDeviceFingerPrintKey = newDeviceFingerPrintKey;
        this.#oldAccessTokenKeyVersion = oldAccessTokenKeyVersion;
        this.#oldRefreshTokenKeyVersion = oldRefreshTokenKeyVersion;
        this.#oldDeviceFingerPrintKeyVersion = oldDeviceFingerPrintKeyVersion;
        this.#newAccessTokenKeyVersion = newAccessTokenKeyVersion;
        this.#newRefreshTokenKeyVersion = newRefreshTokenKeyVersion;
        this.#newDeviceFingerPrintKeyVersion = newDeviceFingerPrintKeyVersion;

    }
    getCloudConfig() {
        return {
            region: this.#region,
            accessKeyId: this.#accessKeyId,
            secretAccessKey: this.#secretAccessKey,
        };
    }
    getS3Config() {
        return this.#bucketName;
    }
    getRedisConfig() {
        return {
            port: this.#redisPort,
            host: this.#redisHost,
            password: this.#redisPassword,
            username: this.#redisUsername
        };
    }
    getHmacKey() {
        return this.#hmacKey;
    }
    getRedpandaConfig() {
        return {
            clientId: this.#redpandaClientId,
            brokers: this.#redpandaBrokers
        };
    }
    getDatabaseConfig() {
        return this.#connectionUrl;
    }
    getValidKeys() {
        return {
            hmacKey: this.#hmacKey,
            oldAccessTokenKey: this.#oldAccessTokenKey,
            oldRefreshTokenKey: this.#oldRefreshTokenKey,
            oldDeviceFingerPrintKey: this.#oldDeviceFingerPrintKey,
            newAccessTokenKey: this.#newAccessTokenKey,
            newRefreshTokenKey: this.#newRefreshTokenKey,
            newDeviceFingerPrintKey: this.#newDeviceFingerPrintKey,
            oldAccessTokenKeyVersion: this.#oldAccessTokenKeyVersion,
            oldRefreshTokenKeyVersion: this.#oldRefreshTokenKeyVersion,
            oldDeviceFingerPrintKeyVersion: this.#oldDeviceFingerPrintKeyVersion,
            newAccessTokenKeyVersion: this.#newAccessTokenKeyVersion,
            newRefreshTokenKeyVersion: this.#newRefreshTokenKeyVersion,
            newDeviceFingerPrintKeyVersion: this.#newDeviceFingerPrintKeyVersion,
        };
    }
};

export {EnvironmentVariable};
