module.exports = class MongoDbTransporter {
    constructor(config){
        this.config=config;
        this.#init();
    }

    #init(){
        if (!this.config.mongodb){
            throw "mongodb configuration required";
        }
    }

    #getMongoVarEscaped(val){
        return val;
    }

    constructMongoDbUrl(){
        let url = "mongodb://";
        if (this.config.mongodb.username){
            url+=this.#getMongoVarEscaped(this.config.mongodb.username);
            url+=":"+this.#getMongoVarEscaped(this.config.mongodb.password);
            url+"@";
        }
        url+=this.config.mongodb.host+":"+this.config.mongodb.port+"/";
        return url;
    }

    //transporter send must return a promise
    send(props){
        return new Promise(async(resolve,reject)=>{
            var MongoClient = require('mongodb').MongoClient;
            let url = this.config.mongodb.url || this.constructMongoDbUrl();
            try{
                let client = await MongoClient.connect(url);
                let db = client.db(this.config.mongodb.dbname);
                if (!props.severity){
                    props.severity="normal";
                }
                let logObj = {severity: props.severity,date_time: props.date_time,log_text: props.log_text,attributes: props.attributes};
                let collectionName = this.config.mongodb.collection || "logs";
                let resp = await db.collection(collectionName).insertOne(logObj);
                client.close();
                resolve(logObj);    
            }catch(e){
                reject(e);
            }
        });
    }
}