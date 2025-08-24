import {configManagerClient} from "../clients/configManager.client.js";

export function getCloudConfig() {
    return new Promise(
        (resolve,reject)=>{
            configManagerClient.cloudConfig({},(err,res)=>{
                if(err){
                    return reject(err);
                }
                return resolve(res);
            });
        }
    );
};