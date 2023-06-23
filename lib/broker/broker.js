var messageBrokerConnection = null;
var messageBrokerChannel = null;

module.exports = class RameezMessageBroker {
    constructor(config){
        this.config=config;
        this.#init();
    }

    #init(){
        if (!this.config.host){
            this.config.host="localhost";
        }
        if (!this.config.port){
            this.config.port="5672";
        }
        if (!this.config.queue){
            this.config.queue="default";
        }
    }

    start(){
        const amqp = require("amqplib");
        return new Promise(async(resolve,reject)=>{
            let connection = await amqp.connect("amqp://"+this.config.host+":"+this.config.port);
            messageBrokerConnection=connection;
            this.connection=messageBrokerConnection;
            let channel = await connection.createChannel();
            messageBrokerChannel=channel;
            this.channel=messageBrokerChannel;
            let queue = this.config.queue;
            this.channel.assertQueue(queue, {
                durable: false
            });
            this.queue=queue;
            resolve({connection:this.connection,channel:this.channel,queue:this.queue});  
        });
    }

    stop(){
        if (this.connection){
            this.connection.close();
        }
        this.connection=null;
        this.channel=null;
        this.queue=null;
        messageBrokerConnection=null;
        messageBrokerChannel=null;
    }

    listenForMessages(){
        return new Promise((resolve,reject)=>{
            if (!this.channel){
                reject("No channel");
                return;
            }
            this.channel.consume(this.queue,(msg)=>{
                if (this.config.onMessage){
                    this.config.onMessage(JSON.parse(msg.content.toString()));
                }
            },{
                noAck: true
            });
            resolve(true);
        });
    }

    send(jsonData){
        this.sendToQueue(this.queue,jsonData);
    }

    sendToQueue(queue,jsonData){
        if (!this.channel){
            throw "No channel";
        }
        let jsonStr=JSON.stringify(jsonData);
        this.channel.sendToQueue(queue,Buffer.from(jsonStr));
    }
}