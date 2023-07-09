# Logging Service
## Supported Transports
- console
- mongodb
## Creating service
```
const logging = require("./lib/logging");
//using mongodb as storage
let loggingService = logging.createService({
    transport: "mongodb",
    mongodb: {
        host: "localhost",
        port: "27017",
        username: "test",
        password: "test",
        dbname: "nodejs",
        collection: "logs",
    },
})
OR you can use direct url for mongodb connection
let loggingService = logging.createService({
    transport: "mongodb",
    mongodb: {
        url: "mongodb+srv://username:password@abc.domain.net/"
        dbname: "nodejs",
        collection: "logs",
    },
})
//using console as output
let loggingService = logging.createService({
    transport: "console",
})
```
## Writing log message
```
loggingService.write({
    severity: "normal",
    date_time: new Date().toISOString(),
    log_text: "hello world",
    attributes: {meta1: "meta1",meta2: "meta2"}
});
```

# Email Service
## Supported Transports
- mailgun
- sendgrid
## Creating service
```
const email = require("./lib/email");
//using mailgun as transport
let emailService = email.createService({
    transport: "mailgun",
    mailgun:{
        username: "your_mailgun_username",
        key: "your_mailgun_api_key",
        domain: "your_mailgun_verified_domain",
    }
});
//using sendgrid as transport
let emailService = email.createService({
    transport: "sendgrid",
    sendgrid:{
        key: "your_sendgrid_api_key",
    }
});
```
## Sending email
```
emailService.send({
    from: "yourfrom@domain.com",
    to: "hello@domain.com",
    subject: "Subject of your email",
    body: "body of your html (can contain html)",
});
```

# Sms Service
## Supported Transports
- twilio
## Creating service
```
const sms = require("./lib/sms");
//using twilio as transport
let smsService = sms.createService({
    transport: "twilio",
    twilio: {
        accound_sid: "your_twilio_account_sid",
        auth_token: "your_twilio_auth_token",
    },
});
```
## Sending sms
```
smsService.send({
    from: "+1234567",
    to: "+00000000",
    body: "Hello world!"
});
```
# Cache Service
## Supported Transports
- memory
- file
## Creating service
```
const cache = require("./lib/cache");
//using memory as transport
let cacheService = cache.createService({
    transport: "memory",
});
```
## Adding value to cache
```
cacheService.put({
    key: "hello",
    value: "world"
});
```
## Getting value from cache
```
cacheService.get({
    key: "hello",
});
```
## Removing value from cache
```
cacheService.remove({
    key: "hello",
});
```
# Enable HTTP endpoints for a service
To enable any service to run over http exposing respective endpoints **http** configuration element can be passed when creating service.
```
let loggingService = logging.createService({
    transport: "console",
    http: {
        enabled: true,
        port: 1001
    }
})
```
Any service that is passed this http configuration will run on port 1001 exposing its endpoints

# HTTP Endpoints exposed by each service

## Logging Service
### write (writes the log)
> POST /write <br />
{"severity":"normal","log_text": "Hello world","date_time":"2023-11-11 01:30:00","attributes":{"meta1":"meta1 value","meta2":"meta2 value"}}

## Email Service
### send (send the email)
> POST /send <br />
{"to":"hello@domain.com","subject": "This is email subject","body":"this is email body"}

## Sms Service
### send (send the sms)
> POST /send <br />
{"to":"+0000000","body":"this is sms body"}

# Enable queue based messaging for a service
To enable any service to listen for a queue or send message to a queue on broker, **queue** configuration element can be passed when creating service.
```
let loggingService = logging.createService({
    transport: "console",
    queue: {
        enabled: true,
        name: "logs", //name of the queue to listen
    }
})
```
## Disable the listening for messages on queue but keep the queue behavior enabled
```
let loggingService = logging.createService({
    transport: "console",
    queue: {
        enabled: true,
        name: "logs", //name of the queue to listen
        receiver: false, //this will tell the service not to listen for messages from the queue
    }
})
```