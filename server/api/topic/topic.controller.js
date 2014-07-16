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
var Topic = require('./topic.model');

// Get list of things
exports.index = function(req, res) {
    Topic.find(function(err, things) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, things);
    });
};


// Get a single thing
exports.show = function(req, res) {
    Topic.findById(req.params.id, function(err, node) {
        if (err) {
            return handleError(res, err);
        }
        if (!node) {
            return res.send(404);
        }
        return res.json(node);
    });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
    Topic.create(req.body, function(err, node) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, node);
    });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Topic.findById(req.params.id, function(err, node) {
        if (err) {
            return handleError(err);
        }
        if (!node) {
            return res.send(404);
        }
        var updated = _.merge(node, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(err);
            }
            return res.json(200, node);
        });
    });
};


exports.batchUpdate = function(req, res) {
    for (var i = req.body.length - 1; i >= 0; i--) {
      console.log(req.body[i])
        Topic.update({
            _id: req.body[i].id
        }, {
            $set: req.body[i]
        }, {
            multi: true
        }, function(err, success) {
            if (err)
                console.log(err);
            console.log(success)
        })
    };


}

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
    Topic.findById(req.params.id, function(err, node) {
        if (err) {
            return handleError(res, err);
        }
        if (!node) {
            return res.send(404);
        }
        node.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
