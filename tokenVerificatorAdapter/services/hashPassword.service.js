import {hashingPasswordClient} from "../clients/hashingPassword.client.js";

export function hashPassword(password) {
    return new Promise((resolve, reject) => {
        hashingPasswordClient.hashPassword({ password }, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
};
