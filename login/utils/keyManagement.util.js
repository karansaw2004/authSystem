import crypto from "crypto";
import JWT from "jsonwebtoken";


export class SecurityManagement {
  #hmacKey;
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
    this.#hmacKey = null;
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
  setConfig(
    {
    hmacKey,
    oldAccessTokenKeyVersion,
    oldRefreshTokenKeyVersion,
    oldDeviceFingerPrintKeyVersion,
    oldAccessTokenKey,
    oldRefreshTokenKey,
    oldDeviceFingerPrintKey,
    newAccessTokenKeyVersion,
    newRefreshTokenKeyVersion,
    newDeviceFingerPrintKeyVersion,
    newAccessTokenKey,
    newRefreshTokenKey,
    newDeviceFingerPrintKey,
  }
  ) {
    this.#hmacKey = hmacKey;
    this.#oldAccessTokenKeyVersion = oldAccessTokenKeyVersion;
    this.#oldRefreshTokenKeyVersion = oldRefreshTokenKeyVersion;
    this.#oldDeviceFingerPrintKeyVersion = oldDeviceFingerPrintKeyVersion;
    this.#oldAccessTokenKey = oldAccessTokenKey;
    this.#oldRefreshTokenKey = oldRefreshTokenKey;
    this.#oldDeviceFingerPrintKey = oldDeviceFingerPrintKey;
    this.#newAccessTokenKeyVersion = newAccessTokenKeyVersion;
    this.#newRefreshTokenKeyVersion = newRefreshTokenKeyVersion;
    this.#newDeviceFingerPrintKeyVersion = newDeviceFingerPrintKeyVersion;
    this.#newAccessTokenKey = newAccessTokenKey;
    this.#newRefreshTokenKey = newRefreshTokenKey;
    this.#newDeviceFingerPrintKey = newDeviceFingerPrintKey;
  }
  #createHmac(message, key) {
    return crypto.createHmac("sha256", key).update(message).digest("hex");
  }
  #createJwtToken(payload, key, expiresIn) {
    return JWT.sign(payload, key, { expiresIn });
  }
  #decodeJwtToken(token, key) {
    try {
      return JWT.verify(token, key);
    } catch (error) {
      return null;
    }
  }
  #verifyHmac(receivedHmac, message, key) {
    const expectedHmac = this.#createHmac(message, key);
    let actual;
    try {
      actual = Buffer.from(receivedHmac, "hex");
    } catch (error) {
      return false;
    }
    try {
      return crypto.timingSafeEqual(Buffer.from(expectedHmac, "hex"), actual);
    } catch (error) {
      return false;
    }
  }
  #extractVersionAndDigest(message) {
    if (message.split(":").length !== 2) {
      return {
        success: false,
        version: null,
        digest: null,
      };
    }
    const [version, digest] = message.split(":");
    return {
      success: true,
      version,
      digest,
    };
  }
  #findKey(oldKeyVersion, newKeyVersion, oldKey, newKey, version) {
    if (version === newKeyVersion) {
      return {
        success: true,
        key: newKey,
        reHash: false,
      };
    } else if (version === oldKeyVersion) {
      return {
        success: true,
        key: oldKey,
        reHash: true,
      };
    } else {
      return {
        success: false,
        key: null,
        reHash: false,
      };
    }
  }
  createUserId(mail) {
    console.log("here");
    console.log(this.#hmacKey);
    return this.#createHmac(mail, this.#hmacKey);
  }
  createDeviceFingerPrintHash(deviceFingerPrint) {
    return `${this.#newDeviceFingerPrintKeyVersion}:${this.#createHmac(deviceFingerPrint, this.#newDeviceFingerPrintKey)}`;
  }
  verifyDeviceFingerPrintHash(deviceFingerPrint, deviceFingerPrintHash) {
    const { success, version, digest } = this.#extractVersionAndDigest(
      deviceFingerPrintHash
    );
    if (!success) {
      return {
        success: false,
        reHash: false,
      };
    }
    const {
      success: keyFound,
      key,
      reHash,
    } = this.#findKey(
      this.#oldDeviceFingerPrintKeyVersion,
      this.#newDeviceFingerPrintKeyVersion,
      this.#oldDeviceFingerPrintKey,
      this.#newDeviceFingerPrintKey,
      version
    );
    if (!keyFound) {
      return {
        success: false,
        reHash: false,
      };
    }
    const hmacVerified = this.#verifyHmac(digest, deviceFingerPrint, key);
    console.log(hmacVerified);
    if (!hmacVerified) {
      return {
        success: false,
        reHash: false,
      };
    }
    return {
      success: true,
      reHash: reHash,
    };
  }
  #verifyToken(token, oldKeyVersion, oldKey, newKeyVersion, newKey) {
    const { success, version, digest } = this.#extractVersionAndDigest(token);
    if (!success) {
      return {
        success: false,
        reHash: false,
        payload: null,
      };
    }
    const {
      success: keyFound,
      key,
      reHash,
    } = this.#findKey(oldKeyVersion, newKeyVersion, oldKey, newKey, version);
    if (!keyFound) {
      return {
        success: false,
        reHash: false,
        payload: null,
      };
    }
    const payload = this.#decodeJwtToken(digest, key);
    if (!payload) {
      return {
        success: false,
        reHash: false,
        payload: null,
      };
    }
    return {
      success: true,
      reHash: reHash,
      payload: payload,
    };
  }
  verifyAccessToken(token) {
    return this.#verifyToken(
      token,
      this.#oldAccessTokenKeyVersion,
      this.#oldAccessTokenKey,
      this.#newAccessTokenKeyVersion,
      this.#newAccessTokenKey
    );
  }
  verifyRefreshToken(token) {
    return this.#verifyToken(
      token,
      this.#oldRefreshTokenKeyVersion,
      this.#oldRefreshTokenKey,
      this.#newRefreshTokenKeyVersion,
      this.#newRefreshTokenKey
    );
  }
  createAccessToken(payload, expiresIn) {
    const token = this.#createJwtToken(
      payload,
      this.#newAccessTokenKey,
      expiresIn
    );
    return `${this.#newAccessTokenKeyVersion}:${token}`;
  }
  createRefreshToken(payload, expiresIn) {
    const token = this.#createJwtToken(
      payload,
      this.#newRefreshTokenKey,
      expiresIn
    );
    return `${this.#newRefreshTokenKeyVersion}:${token}`;
  }
};
