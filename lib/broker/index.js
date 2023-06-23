function createBroker(props){
    const createBrokerFromFactory = require("./brokerfactory");
    return createBrokerFromFactory(props);
}

exports.createBroker = createBroker;