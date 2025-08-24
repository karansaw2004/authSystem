import {configManagerClient} from "../clients/configManager.client.js";

export function getValidKeys() {
    return new Promise(
        (resolve,reject)=>{
            configManagerClient.validKeys({},(err,res)=>{
                if(err){
                    return reject(err);
                }
                return resolve(res);
            });
        }
    );
};