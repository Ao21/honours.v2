/**
 * Broadcast updates to client when the model changes
 */

'use strict';


exports.register = function(socket,socketio) {
	var _socket = socket;
  
  socket.on('realtime:join', function (data) {
    var newRoom = 'doc'+data.docId;
    socket.join('realtime');
    emit(_socket, 'realtime:joined', data );

  });

  socket.on('realtime:selectParagraph', function (data) {
    var thisroom = 'doc'+data.docId;
    emit(_socket, 'realtime:lockParagraph', data);
    //socketio.sockets.emit('realtime:lockParagraph','hi');
  });

  socket.on('realtime:deSelectParagraph', function (data) {
    var thisroom = 'doc'+data.docId;
    emit(_socket, 'realtime:unlockParagraph', data);
    //socketio.sockets.emit('realtime:lockParagraph','hi');
  });

  socket.on('realtime:updateDocs', function (data) {
    var thisroom = 'doc'+data.docId;
    emit(_socket, 'realtime:updateDocs', data);
    //socketio.sockets.emit('realtime:lockParagraph','hi');
  });


}


function emit(socket, model, doc, cb){
	socket.to('realtime').broadcast.emit(model, doc);
}