function testSmsService(){
    const sms = require("./lib/sms");
    let smsService = sms.createService({
        transport: "twilio",
        accound_sid: "xxxxx",
        auth_token: "xxxxxx",
    });
    smsService.send({
        from: "+1234567",
        to: "+00000000",
        body: "Hello world!"
    });
}

function testLoggingService(){
    const logging = require("./lib/logging");
    let loggingService = logging.createService({
        transport: "console"
    });
    loggingService.write({severity: "normal",date_time: new Date().toISOString(),log_text: "hello world",attributes: {meta1: "meta1",meta2: "meta2"}});
}

function testEmailService(){
    const email = require("./lib/email");
    let emailService = email.createService({
        transport: "mailgun",
        username: "xxxx",
        key: "xxxxx",
        domain: "xxx@yyy.com",
    })
    emailService.send({
        from: "xxxx",
        to: "xxxxx",
        subject: "xxxx",
        body: "xxxxx",
    });
}

//testSmsService();
//testEmailService();
//testLoggingService();

console.log("Done!");