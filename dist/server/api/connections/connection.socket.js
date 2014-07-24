/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var connection = require('./connection.model');

exports.register = function(socket) {
  connection.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  connection.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('connection:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('connection:remove', doc);
}