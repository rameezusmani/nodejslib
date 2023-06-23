function testSmsService(){
    const sms = require("./lib/sms");
    let smsService = sms.createService({
        transport: "twilio",
        twilio: {
            accound_sid: "xxxxx",
            auth_token: "xxxxxx",
        },
        http: {
            enabled: true,
            port: 9004
        },
        queue: {
            enabled: true,
            name: "sms",
        }
    });
    // smsService.send({
    //     from: "+1234567",
    //     to: "+00000000",
    //     body: "Hello world!"
    // });
}

function testLoggingService(){
    const logging = require("./lib/logging");
    let loggingService = logging.createService({
        transport: "console",
        mongodb: {
            host: "localhost",
            port: "27017",
            dbname: "nodejs",
        },
        http: {
            enabled: true,
            port: 9003,
        },
        queue: {
            enabled: true,
            name: "logs2",
        }
    });
    loggingService.write({severity: "normal",date_time: new Date().toISOString(),log_text: "hello world",attributes: {meta1: "meta1",meta2: "meta2"}});
}

function testEmailService(){
    const email = require("./lib/email");
    let emailService = email.createService({
        transport: "mailgun",
        mailgun:{
            username: "xxxx",
            key: "xxxxx",
            domain: "xxx@yyy.com",
        },sendgrid: {
            key: "xxxxx",
        },
        http: {
            enabled: true,
            port: 9002
        },
        queue: {
            enabled: true,
            name: "email",
        }
    });
    // emailService.send({
    //     from: "xxxx",
    //     to: "xxxxx",
    //     subject: "xxxx",
    //     body: "xxxxx",
    // });
}

testSmsService();
testEmailService();
testLoggingService();

console.log("Done!");