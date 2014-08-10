/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var _ = require('lodash');
var redis = require('../../components/redis.js');
var ss = [];
var people = [];
var doc = {};

exports.register = function(socket, socketio) {
    var _socket = socket;
    var _socketio = socketio;


    socket.on('sharedspace:join', function(data) {
        var newRoom = 'doc' + data.list;
        ss.push({
            id: data.list,
            currentUsers: []
        });

        if (data.userId) {
            socket.userId = data.userId;
        }
        socket.join('sharedspace');
        //emit(_socket, 'realtime:joined', data);

    });

    socket.on('sharedspace:object:delete', function(data) {
        redis.lset(data.list, data.objIndex, 'RME');
        redis.lrem(data.list, 0, 'RME');
        updateDelete(socketio, data.list, data.index);

    });


    socket.on('sharedspace:object:update', function(data) {
        redis.lset(data.list, data.obj.in, JSON.stringify(data.obj));
        socket.broadcast.emit('sharedspace:object:updates', data.obj);
    });

    socket.on('sharedspace:object:create', function(data) {
        updateAll(socketio,data.list)
    });




}

function checkIfPAlreadyInUse(doc, pId) {

}

function emit(socket, model, doc, cb) {
    socket.to('sharedspace').broadcast(model, doc);
}

function updateAll(socketio, dataList) {
    var arr = [];
    redis.lrange(dataList, 0, -1, function(err, replies) {
        if (err) {
            return handleError(res, err);
        }
        for (var i = 0; i < replies.length; i++) {
            var r = JSON.parse(replies[i]);
            r.in = i;
            arr.push(r);
        };
            console.log(arr);

        socketio.sockets.emit('sharedspace:object:updateAll', arr);

    })
}


function updateDelete(socketio, dataList, index) {
    var arr = [];
    redis.lrange(dataList, 0, -1, function(err, replies) {
        if (err) {
            return handleError(res, err);
        }
        for (var i = 0; i < replies.length; i++) {
            var r = JSON.parse(replies[i]);
            r.in = i;
            arr.push(r);
        };
        var obj = {
            index: index,
            array: arr
        }
        socketio.sockets.emit('sharedspace:object:deleted', obj);

    })
}
