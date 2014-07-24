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
var Track = require('./track.model');

// Get list of things
exports.index = function(req, res) {
    Track.find(function(err, things) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, things);
    });
};

exports.showTopicTracks = function(req,res){
    Track.find({'attachedTo':req.params.id})
        .populate('userId','name google')
        .populate('attachedTo')
        .exec(function(err, updates){
        if(err){
            return handleError(res, err);
        }
        if(!updates){
            return res.send(404);
        }
        return res.json(updates);
    });
}

// Get a single thing
exports.show = function(req, res) {
    Track.findById(req.params.id, function(err, node) {
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
    Track.create(req.body, function(err, node) {
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
    Track.findById(req.params.id, function(err, node) {
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



// Deletes a thing from the DB.
exports.destroy = function(req, res) {
    Track.findById(req.params.id, function(err, node) {
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



exports.iCreate = function(item, callback){
    Track.create(item, function(err, node) {
        if(err){
            console.log(err);
        }
        console.log(node);
    });
}