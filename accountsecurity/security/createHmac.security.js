import crypto from 'crypto';
export function createHmac(message,secret) {
    return crypto.createHmac('sha256', secret).update(message).digest('hex');
};