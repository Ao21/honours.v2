/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket,socketio) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/thing/thing.socket').register(socket);
  require('../api/topic/topic.socket').register(socket);
  require('../api/object/object.socket').register(socket, socketio);
  require('../api/connections/connection.socket').register(socket);
  require('../api/document/document.socket').register(socket, socketio);
}

module.exports = function (socketio) {
  // The amount of detail that the server should output to the logger.
  // 0 - error
  // 1 - warn
  // 2 - info
  // 3 - debug
  socketio.set('log level', 2);

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.set('authorization', require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.sockets.on('connection', function (socket) {
    socket.address = socket.handshake.address.address + ':' +
                     socket.handshake.address.port;
    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket,socketio);
    console.info('[%s] CONNECTED', socket.address);
  });
};