var io = null;
var cookieParser = require('cookie');
var config = require('./utils/config');
var session = require('client-sessions');

module.exports = {
    init: function(server){
        io = require('socket.io')(server);
        io.on('connection', function(socket){
            console.log('a user connected');
            var cookie = cookieParser.parse(socket.handshake.headers.cookie);
            var opts = config.session;
            var test = session.util.decode(opts, cookie.session);
            for(var i = 0; i < test.content.user.following.length; i++){
                socket.join(test.content.user.following[i]);
            }
            socket.join(test.content.user._id);
            socket.on('disconnect', function(){
                console.log('user disconnected');
            });
        });

    },
    instance: function(){
        return io;
    }
};