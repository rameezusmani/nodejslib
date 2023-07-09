module.exports = class RameezSmsService {
    constructor(config){
        if (!config.transport){
            config.transport="twilio";
        }
        this.config=config;
        this.#init();
    }

    #init(){
        this.transporter=this.#getTransporter();
        if (this.transporter==null){
            throw "Transport "+this.config.transport+" not supported";
        }
    }

    send(props) {
        return this.transporter.send(props);
    }

    #getTransporter(){
        let transport=this.config.transport.toLowerCase();
        if (transport=="twilio"){
            const TwilioTransporter = require("./transporters/twilio");
            return new TwilioTransporter(this.config);
        }
        return null;
    }
}