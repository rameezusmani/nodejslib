module.exports = class MongoDbTransporter {
    constructor(config){
        this.config=config;
        this.#init();
    }

    #init(){
    }

    //transporter send must return a promise
    send(props){
        return new Promise(async(resolve,reject)=>{
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://"+this.config.host+":"+this.config.port+"/"+this.config.dbname;
            try{
                let client = await MongoClient.connect(url);
                let db = client.db(this.config.dbname);
                if (!props.severity){
                    props.severity="normal";
                }
                let logObj = {severity: props.severity,date_time: props.date_time,log_text: props.log_text,attributes: props.attributes};
                let collectionName = this.config.collection || "logs";
                let resp = await db.collection(collectionName).insertOne(logObj);
                client.close();
                resolve(logObj);    
            }catch(e){
                reject(e);
            }
        });
    }
}