module.exports = class SendgridTransporter {
    constructor(config){
        this.config=config;
        this.#init();
    }

    #init(){
        if (!this.config.sendgrid){
            throw "sendgrid configuration required";
        }
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(this.config.sendgrid.key);
        this.sendgrid=sgMail;
    }

    //transporter send must return a promise
    send(props){
        return new Promise((resolve,reject)=>{
            this.sendgrid.send({
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