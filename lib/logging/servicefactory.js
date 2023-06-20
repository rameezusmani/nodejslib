module.exports = function createService(config){
    const ServiceBluePrint = require("./service.js");
    return new ServiceBluePrint(config);
    // let service = new ServiceBluePrint({
    //     transport: transport,
    //     host: "localhost", //pick from env or database
    //     port: "27017", //pick from env or database
    //     dbname: "nodejs", //pick from env or database
    //     collection: "logs", //pick from env or database
    // });
    // return service;
}