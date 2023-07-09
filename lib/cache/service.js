module.exports = class RameezCacheService {
    constructor(config){
        if (!config.transport){
            config.transport="memory";
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

    put(props) {
        return this.transporter.put(props);
    }

    get(props) {
        return this.transporter.get(props);
    }

    remove(props) {
        return this.transporter.remove(props);
    }

    #getTransporter(){
        let transport=this.config.transport.toLowerCase();
        if (transport=="memory"){
            const MemoryTransporter = require("./transporters/memory");
            return new MemoryTransporter(this.config);
        }else if (transport=="file"){
            const FileTransporter = require("./transporters/file");
            return new FileTransporter(this.config);
        }
        return null;
    }
}