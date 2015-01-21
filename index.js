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
            filename: path.join(twee.getBaseDirectory(), twee.getConfig('twee:options:logging:winston:accessFile'))
        })
    ];

    if (twee.getConfig('twee:options:logging:winston:consoleLogging')) {
        transports.push(new winston.transports.Console(
            twee.getConfig('twee:options:logging:winston:consoleLoggingOptions')
        ));
    }

    twee.getApplication().use(expressWinston.logger({
        transports: transports,
        exceptionHandlers: [
            new winston.transports.File({
                filename: path.join(twee.getBaseDirectory(), twee.getConfig('twee:options:logging:winston:exceptionsFile'))
            })
        ],
        exitOnError: twee.getConfig('twee:options:logging:winston:exitOnError')
    }));
};
