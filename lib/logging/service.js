module.exports = class RameezLoggingService {
    constructor(config){
        if (!config.transport){
            config.transport="console";
        }
        this.config=config;
        this.#init();
    }

    #init(){
        this.transporter = this.#getTransporter();
        if (this.transporter==null){
            throw "Transport "+this.config.transport+" not supported";
        }
    }

    write(props) {
        return this.transporter.write(props);
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