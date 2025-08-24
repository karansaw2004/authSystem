import {configManagerClient} from "../clients/configManager.client.js";

export function getRedpandaConfig() {
    return new Promise(
        (resolve,reject)=>{
            configManagerClient.redpandaConfig({},(err,res)=>{
                if(err){
                    return reject(err);
                }
                return resolve(res);
            });
        }
    );
};