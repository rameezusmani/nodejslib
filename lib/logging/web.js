module.exports = function startWebservice(port,service) {
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    app.use(bodyParser.json());
    const PORT = port;

    app.post('/write',async(req, res) => {
        let log_text = req.body.log_text;
        let date_time = req.body.date_time;
        let severity = req.body.severity;
        let attributes = req.body.attributes;
        try{
            service.writeLog({
                log_text: log_text,
                date_time: date_time,
                severity: severity,
                attributes: attributes,
            });
        }catch(e){
            console.error(e);
        }
        res.send({status: 200,msg:""});
    })
    app.listen(PORT,()=>{
        console.log("Logging service listening on PORT "+PORT);
    });
}