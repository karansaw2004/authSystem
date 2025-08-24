import {configManagerClient} from "../clients/configManager.client.js";

export function getRedisConfig() {
    return new Promise(
        (resolve,reject)=>{
            configManagerClient.redisConfig({},(err,res)=>{
                if(err){
                    return reject(err);
                }
                return resolve(res);
            });
        }
    );
};