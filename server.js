#!/usr/bin/node

var fs = require('fs');
var https = require('https');
var options = {
            key: fs.readFileSync('snakeoil.key'),
            cert: fs.readFileSync('snakeoil.crt'),
            ca: fs.readFileSync('snakeoil.crt'),
            requestCert: true,
            rejectUnauthorized: false
};
https.createServer(options, function (req, res) {
            console.log(new Date()+' '+
                            req.connection.remoteAddress+' '+
                            req.method+' '+req.url);
            res.writeHead(200);
            var certstr = JSON.stringify(req.connection.getPeerCertificate(), null, 2);
            if(certstr == '{}') { certstr = 'No cert provided by client'; }
            res.write('<html>Your cert:<br><pre>' + certstr + '</pre></html>');
            res.end("hello world\n");
}).listen(4433);
