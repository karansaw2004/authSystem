import {hashingPasswordClient} from "../clients/hashingPassword.client";


export function verifyPassword(password, hashedPassword) {
    return new Promise((resolve, reject) => {
        hashingPasswordClient.verifyPassword({ password, hashedPassword }, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
}
