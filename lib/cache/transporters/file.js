module.exports = class FileTransporter {
    constructor(config){
        this.config=config;
        this.#init();
    }

    #init(){
        if (!this.config.file){
            throw "file configuration required";
        }
    }

    put(props){
        return new Promise((resolve,reject)=>{
            console.log(props.key+"::"+props.value);
            resolve(true);
        });
    }

    get(props){
        return new Promise((resolve,reject)=>{
            console.log(props.key);
            resolve("hello");
        });
    }

    remove(props){
        return new Promise((resolve,reject)=>{
            console.log(props.key);
            resolve(true);
        });
    }
}