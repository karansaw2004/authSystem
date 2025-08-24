import {configManagerClient} from "../clients/configManager.client.js";

export function getHmacKey() {
    return new Promise(
        (resolve,reject)=>{
            configManagerClient.hmacKey({},(err,res)=>{
                if(err){
                    return reject(err);
                }
                return resolve(res);
            });
        }
    );
};