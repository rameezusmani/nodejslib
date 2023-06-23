module.exports = function startWebservice(port,service) {
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    app.use(bodyParser.json());
    const PORT = port;

    app.post('/send',async(req, res) => {
        let to = req.body.to;
        let subject = req.body.subject;
        let body = req.body.body;
        try{
            let response = await service.sendEmail({
                from: "from email",
                to: to,
                subject: subject,
                body: body,
            });
        }catch(e){
            console.error(e);
        }
        res.send({status: 200,msg:""});
    })
    app.listen(PORT,()=>{
        console.log("Email service listening on PORT "+PORT);
    })
}