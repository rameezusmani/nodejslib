module.exports = function startWebservice(port,service) {
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    app.use(bodyParser.json());
    const PORT = port;

    app.post('/send',async(req, res) => {
        //extract properties here like to,body
        let to = req.body.to;
        let body = req.body.body;
        try{
            let response = await service.sendSms({
                from: "from number",
                to: to,
                body: body,
            });
        }catch(e){
            console.error(e);
        }
        res.send({status: 200,msg:""});
    })
    app.listen(PORT,()=>{
        console.log("Sms service listening on PORT "+PORT);
    })
}