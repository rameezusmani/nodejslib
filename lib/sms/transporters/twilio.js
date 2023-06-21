module.exports = class TwilioTransporter {
    constructor(config){
        this.config=config;
        this.#init();
    }

    #init(){
        if (!this.config.twilio){
            throw "twilio configuration required";
        }
        this.twilio = require('twilio')(this.config.twilio.account_sid,this.config.twilio.auth_token, { lazyLoading: true});
    }

    //transporter send must return a promise
    send(props){
        return new Promise((resolve,reject)=>{
            this.twilio.messages.create({
                from: props.from,
                to: props.to,
                body: props.body,
            }).then((msg) => {
                resolve(msg);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}