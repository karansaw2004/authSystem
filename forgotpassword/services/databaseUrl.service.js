import {configManagerClient} from "../clients/configManager.client.js";

export function getDatabaseUrl() {
    return new Promise(
        (resolve,reject)=>{
            configManagerClient.databaseUrl({},(err,res)=>{
                if(err){
                    return reject(err);
                }
                return resolve(res);
            });
        }
    );
};