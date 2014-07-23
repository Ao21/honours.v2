/**
 * Broadcast updates to client when the model changes
 */

'use strict';


exports.register = function(socket) {
  socket.on('realtime', function (data) {
    console.log(data);
  });
}

