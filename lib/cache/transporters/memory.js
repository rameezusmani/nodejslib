module.exports = class MemoryTransporter {
    constructor(config){
        this.config=config;
        this.#init();
    }

    #init(){
        this.cache={};
    }

    put(props){
        return new Promise((resolve,reject)=>{
            if (!this.cache[props.key]
                || props.replace!==false){
                    this.cache[props.key]=props.value;
                }
            resolve(true);
        });
    }

    get(props){
        return new Promise((resolve,reject)=>{
            resolve(this.cache[props.key]);
        });
    }

    remove(props){
        return new Promise((resolve,reject)=>{
            this.cache[props.key]=null;
            resolve(true);
        });
    }
}