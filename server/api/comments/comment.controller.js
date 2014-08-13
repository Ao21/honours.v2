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
var Comment = require('./comment.model');
var Tracks = require('../track/track.controller');
var redis = require('../../components/redis.js');
var Tracks = require('../track/track.controller');
var crypto = require('crypto');

// Get list of things
exports.index = function(req, res) {
    Comment.find(function(err, things) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, things);
    });
};


// Get a single thing
exports.show = function(req, res) {
    var arr = [];
    redis.lrange(req.params.id+'-comments', 0, -1, function(err,replies){
        if (err) {
            return handleError(res, err);
        }
        console.log(replies);

        for (var i = 0; i < replies.length; i++) {
            var r = JSON.parse(replies[i]);
            r.in = i;
            arr.push(r);
        };
        return res.json(200,arr );
    })
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
    console.log(req.body);
    req.body.id= crypto.randomBytes(20).toString('hex');

    redis.rpush(req.body.spaceId+'-comments',JSON.stringify(req.body), function(err, replies){
        req.body.in = (replies-1);
        return res.json(201, req.body);
    });

    /*Comment.create(req.body, function(err, node) {
        if (err) {
            return handleError(res, err);
        }
        
        Tracks.iCreate({'type':'Comment','action':'created','userId':req.user._id,'attachedTo':node._id});
        return res.json(201, node);
    });*/
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Comment.findById(req.params.id, function(err, node) {
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
    Comment.findById(req.params.id, function(err, node) {
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
