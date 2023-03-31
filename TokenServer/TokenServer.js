var http = require('http');
var express = require('express');
var favicon = require('serve-favicon');
var path = require('path')
var {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')
require("../.env");

var PORT = 3000;

var expirationTimeInSeconds = 3600
var role = RtcRole.SUBSCRIBER

var app = express();
app.disable('x-powered-by');
app.set('port', PORT);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

var generateRtcToken = function(req, resp) {
    var currentTimestamp = Math.floor(Date.now() / 1000)
    var privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
    // var CHANNEL_NAME = req.query.CHANNEL_NAME;
    var uid = req.query.uid || 0
    // if (!CHANNEL_NAME) {
    //     return resp.status(400).json({ 'error': 'channel name is required' }).send();
    // }


    var key = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, CHANNEL_NAME, uid, role, privilegeExpiredTs);

    resp.header("Access-Control-Allow-Origin", "*")
    return resp.json({ 'key': key }).send();
};

var generateRtmToken = function(req, resp) {
    var currentTimestamp = Math.floor(Date.now() / 1000)
    var privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
    var account = req.query.account;
    if (!account) {
        return resp.status(400).json({ 'error': 'account is required' }).send();
    }

    var key = RtmTokenBuilder.buildToken(APP_ID, APP_CERTIFICATE, account, RtmRole, privilegeExpiredTs);

    resp.header("Access-Control-Allow-Origin", "*")
    return resp.json({ 'key': key }).send();
};

app.get('/rtcToken', generateRtcToken);
app.get('/rtmToken', generateRtmToken);


http.createServer(app).listen(app.get('port'), function() {
    console.log('Server listening on ' + app.get('port'));
});