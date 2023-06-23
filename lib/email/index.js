const createService = require("./servicefactory");

const createBrokerInstance = async(config,service) => {
    const { onQueueMessage, onQueueError } = require("./queue");
    const createBroker = require("../broker/brokerfactory");
    const broker = createBroker({
        host: config.queue.host || "localhost",
        port: config.queue.port || "5672",
        queue: config.queue.name || "email",
        onError: onQueueError,
        onMessage: onQueueMessage,
    });
    try{
        await broker.start();
        if (config.queue.receiver!==false){
            broker.listenForMessages();
        }
        console.log("broker started");
    }catch(e){
        console.error("Error in starting broker:");
        console.error(e);
    }
}

const createWebserviceInstance = (config,service) => {
    const startWebservice = require("./web");
    let port = config.http.port || 10000;
    startWebservice(port,service);
}

const createServiceInstance = (config) => {
    const service = createService(config);
    if (config.http && config.http.enabled===true){
        createWebserviceInstance(config,service);
    }
    if (config.queue && config.queue.enabled===true){
        createBrokerInstance(config,service);
    }
    return service;
}

module.exports = { createService: createServiceInstance };