module.exports = class MailgunTransporter {
    constructor(config){
        this.config=config;
        this.#init();
    }

    #init(){
        const Mailgun = require('mailgun.js');
        const formData = require('form-data');
        const mailgun = new Mailgun(formData);
        this.mailgun = mailgun.client({
            username:   this.config.username, 
            key:        this.config.key, 
            domain:     this.config.domain,
        });
    }

    //transporter send must return a promise
    send(props){
        return new Promise((resolve,reject)=>{
            this.mailgun.messages.create(this.config.domain, {
                from: props.from,
                to: props.to,
                subject: props.subject,
                html: props.body,
            }).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}