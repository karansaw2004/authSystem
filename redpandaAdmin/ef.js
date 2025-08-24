import crypto from "crypto";

/**
 * Generate a random AES-128 key in hex format
 * @returns {string} 32-character hex string (16 bytes)
 */
function generateAES128Key() {
  return crypto.randomBytes(16).toString("hex"); // 16 bytes = 128 bits
}

// Example usage:
const keyHex = generateAES128Key();
console.log("Generated Key (hex):", keyHex);
