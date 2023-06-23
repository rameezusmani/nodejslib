module.exports = function createBrokerFromFactory(props){
    const MessageBroker = require("./broker");   
    const messageBroker = new MessageBroker({
        host: props.host,
        port: props.port,
        queue: props.queue,
        onError: props.onError,
        onMessage: props.onMessage
    });
    return messageBroker; 
}