/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Connection = require('./connection.model');

// Get list of things
exports.index = function(req, res) {
  Connection.find(function (err, connection) {
    if(err) { return handleError(res, err); }
    return res.json(200, connection);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Connection.findById(req.params.id, function (err, connection) {
    if(err) { return handleError(res, err); }
    if(!connection) { return res.send(404); }
    return res.json(connection);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Connection.create(req.body, function(err, connection) {
    if(err) { return handleError(res, err); }
    return res.json(201, connection);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Connection.findById(req.params.id, function (err, connection) {
    if (err) { return handleError(err); }
    if(!connection) { return res.send(404); }
    var updated = _.merge(connection, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, connection);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Connection.findById(req.params.id, function (err, connection) {
    if(err) { return handleError(res, err); }
    if(!connection) { return res.send(404); }
    connection.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}