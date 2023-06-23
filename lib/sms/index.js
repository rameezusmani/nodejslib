const createService = require("./servicefactory");

const createWebserviceInstance = (config,service) => {
    const startWebservice = require("./web");
    if (config.http.enabled===true){
        let port = config.http.port || 10001;
        startWebservice(port,service);
    }
}

const createServiceInstance = (config) => {
    const service = createService(config);
    if (config.http){
        createWebserviceInstance(config,service);
    }
    return service;
}

module.exports = { createService: createServiceInstance };