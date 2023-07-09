module.exports = function startWebservice(port,service) {
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    app.use(bodyParser.json());
    const PORT = port;

    app.post('/put',async(req, res) => {
        //extract properties here like key,value
        let key = req.body.key;
        let value = req.body.value;
        try{
            let response = await service.put({
                key: key,
                value: value,
            });
        }catch(e){
            console.error(e);
        }
        res.send({status: 200,msg:""});
    })
    app.get('/get',async(req, res) => {
        let key = req.query.key;
        let value=null;
        try{
            value = await service.get({
                key: key,
            });
        }catch(e){
            console.error(e);
        }
        res.send({status: 200,key: key,value: value,msg:""});
    })
    app.post('/remove',async(req, res) => {
        let key = req.body.key;
        try{
            let response = await service.remove({
                key: key,
            });
        }catch(e){
            console.error(e);
        }
        res.send({status: 200,key: key,msg:""});
    })
    app.listen(PORT,()=>{
        console.log("Cache service listening on PORT "+PORT);
    })
}