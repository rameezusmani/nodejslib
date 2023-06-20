module.exports = function createService(config) {
    const ServiceBluePrint = require("./service.js");
    return new ServiceBluePrint(config);
}