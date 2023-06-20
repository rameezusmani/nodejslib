module.exports = class RameezEmailService {
    constructor(config){
        if (!config.transport){
            config.transport="mailgun";
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
        if (transport=="mailgun"){
            const MailgunTrasporter = require("./transporters/mailgun");
            return new MailgunTrasporter(this.config);
        }else if (transport=="sendgrid"){
            const SendgridTransporter = require("./transporters/sendgrid");
            return new SendgridTransporter(this.config);
        }
        return null;
    }
}