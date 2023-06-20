module.exports = class RameezSmsService {
    constructor(config){
        if (!config.transport){
            config.transport="twilio";
        }
        this.config=config;
        this.#init();
    }

    #init(){
    }

    send(props) {
        let transporter = this.#getTransporter();
        if (transporter==null){
            throw "Transport "+this.config.transport+" not supported";
        }
        return transporter.send(props);
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