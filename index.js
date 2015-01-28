/**
 * Extension that allows to write awesome logs
 */
module.exports.extension = function() {
    "use strict";

    var expressWinston = require('express-winston')
        , winston = require('winston')
        , path = require('path');


    var transports = [
        new winston.transports.File({
            filename: path.join(twee.getBaseDirectory(), twee.getConfig('twee:extension:twee-logging:winston:accessFile'))
        })
    ];

    if (twee.getConfig('twee:extension:twee-logging:winston:consoleLogging')) {
        transports.push(new winston.transports.Console(
            twee.getConfig('twee:extension:twee-logging:winston:consoleLoggingOptions')
        ));
    }

    twee.getApplication().use(expressWinston.logger({
        transports: transports,
        exceptionHandlers: [
            new winston.transports.File({
                filename: path.join(twee.getBaseDirectory(), twee.getConfig('twee:extension:twee-logging:winston:exceptionsFile'))
            })
        ],
        exitOnError: twee.getConfig('twee:extension:twee-logging:winston:exitOnError')
    }));
};



module.exports.configNamespace = 'twee-logging';

module.exports.config = {
    "winston": {
        "accessFile": "var/log/access.json",
        "exceptionsFile": "var/log/exceptions.json",
        "exitOnError": false,
        "consoleLogging": false,
        "consoleLoggingOptions": {
            "colorize": true,
            // optional: control whether you want to log the meta data about the request (default to true)
            "meta": true,
            "msg": "HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
            // Use the default Express/morgan request formatting, with the same colors. Enabling this will override any msg and colorStatus if true.
            // Will only output colors on transports with colorize set to true
            "expressFormat": true,
            "colorStatus": true
        }
    }
};
