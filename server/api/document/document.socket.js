/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var _ = require('lodash');
var documents = [];
var people = [];
var doc = {};

exports.register = function(socket, socketio) {
    var _socket = socket;
    var _socketio = socketio;



    socket.on('realtime:join', function(data) {
        var newRoom = 'doc' + data.docId;
        documents.push({
            id: data.docId,
            currentUsers: []
        });

        if (data.userId) {
            socket.userId = data.userId;
        }
        socket.join('realtime');
        emit(_socket, 'realtime:joined', data);
        socketio.sockets.emit('realtime:updateLocks', documents[0]);

    });


    socket.on('realtime:selectParagraph', function(data) {
        var thisroom = 'doc' + data.docId;
        var cUsers = documents[0].currentUsers;

        if (checkIfPAlreadyInUse(documents[0], data.pId)) {

        } else {

            var getUserIndex = _.findIndex(cUsers, {
                userId: data.userId._id
            });

            if (getUserIndex === -1) {
                documents[0].currentUsers.push({
                    userId: data.userId._id,
                    pId: data.pId
                })
            } else {
                documents[0].currentUsers.splice(getUserIndex, 1, {
                    userId: data.userId._id,
                    pId: data.pId
                })
            }
            //console.log(data);
            socketio.sockets.emit('realtime:updateLocks', documents[0]);
            //emit(socket, 'realtime:updateLocks', documents[0]);
        }
        //socketio.sockets.emit('realtime:lockParagraph','hi');
    });

    socket.on('realtime:selectParagraph', function(data) {
        var thisroom = 'doc' + data.docId;
        var cUsers = documents[0].currentUsers;

        if (checkIfPAlreadyInUse(documents[0], data.pId)) {

        } else {

            var getUserIndex = _.findIndex(cUsers, {
                userId: data.userId._id
            });

            if (getUserIndex === -1) {
                documents[0].currentUsers.push({
                    userId: data.userId._id,
                    pId: data.pId
                })
            } else {
                documents[0].currentUsers.splice(getUserIndex, 1, {
                    userId: data.userId._id,
                    pId: data.pId
                })
            }
            //console.log(data);

            emit(_socket, 'realtime:lockParagraph', data);
        }
        //socketio.sockets.emit('realtime:lockParagraph','hi');
    });

    socket.on('realtime:deSelectParagraph', function(data) {
        var thisroom = 'doc' + data.docId;
        emit(_socket, 'realtime:unlockParagraph', data);
        //socketio.sockets.emit('realtime:lockParagraph','hi');
    });

    socket.on('realtime:updateDocs', function(data) {
        var thisroom = 'doc' + data.docId;
        emit(_socket, 'realtime:updateDocs', data);
        socketio.sockets.emit('realtime:updateLocks', documents[0]);
        //socketio.sockets.emit('realtime:lockParagraph','hi');
    });


    socket.on('realtime:leavedocument', function(data) {
        for (var i = documents.length - 1; i >= 0; i--) {
            for (var x = documents[i].currentUsers.length - 1; x >= 0; x--) {
                if (documents[i].currentUsers[x].userId === socket.userId) {
                    console.log('removed User');
                    documents[i].currentUsers.splice(x, 1);
                    socketio.sockets.emit('realtime:updateLocks', documents[0]);
                }
            };
        };
    });

    socket.on('disconnect', function(data) {
        for (var i = documents.length - 1; i >= 0; i--) {
            for (var x = documents[i].currentUsers.length - 1; x >= 0; x--) {
                if (documents[i].currentUsers[x].userId === socket.userId) {
                    console.log('removed User');
                    documents[i].currentUsers.splice(x, 1);
                    socketio.sockets.emit('realtime:updateLocks', documents[0]);
                }
            };
        };
    });


}

function checkIfPAlreadyInUse(doc, pId) {
    for (var i = doc.currentUsers.length - 1; i >= 0; i--) {
        if (doc.currentUsers[i].pId === pId) {
            return true
        }
        return false;
    };
}

function emit(socket, model, doc, cb) {
    socket.to('realtime').broadcast.emit(model, doc);
}
