module.exports = class ConsoleTransporter {
    constructor(config){
        this.config=config;
        this.#init();
    }

    #init(){
    }

    //transporter send must return a promise
    write(props){
        return new Promise((resolve,reject)=>{
            if (!props.severity){
                props.severity="normal";
            }
            console.log(props.severity+"::"+props.date_time+"::"+props.log_text);
            if (props.attributes)
                console.log(props.attributes);
            resolve("1");
        });
    }
}