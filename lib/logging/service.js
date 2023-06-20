module.exports = class RameezLoggingService {
    constructor(config){
        if (!config.transport){
            config.transport="console";
        }
        this.config=config;
        this.#init();
    }

    #init(){
    }

    write(props) {
        let transporter = this.#getTransporter();
        if (transporter==null){
            throw "Transport "+this.config.transport+" not supported";
        }
        return transporter.send(props);
    }

    #getTransporter(){
        let transport=this.config.transport.toLowerCase();
        if (transport=="console"){
            const ConsoleTransporter = require("./transporters/console");
            return new ConsoleTransporter(this.config);
        }else if (transport=="mongodb"){
            const MongoDbTransporter = require("./transporters/mongodb");
            return new MongoDbTransporter(this.config);
        }
        return null;
    }
}