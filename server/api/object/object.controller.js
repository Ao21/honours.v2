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
var obj = require('./object.model');
var redis = require('../../components/redis.js');
var Tracks = require('../track/track.controller');
var crypto = require('crypto');


// Get list of things
exports.index = function(req, res) {
   console.log(req.params);
   /* redis.lrange('req.body.id', 0, -1, function(err,replies){
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, replies);
    })*/
    
};


// Get a single thing
exports.show = function(req, res) {
    var arr = [];
    redis.lrange(req.params.id, 0, -1, function(err,replies){
        if (err) {
            return handleError(res, err);
        }

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
    req.body.id= crypto.randomBytes(20).toString('hex');

    redis.rpush(req.body.spaceId,JSON.stringify(req.body), function(err, replies){
        req.body.in = (replies-1);
        return res.json(201, req.body);
    });
    

    /*obj.create(req.body, function(err, node) {
        if (err) {
            return handleError(res, err);
        }
        
        //Tracks.iCreate({'type':'obj','action':'created','userId':req.user._id,'attachedTo':node._id});
        return res.json(201, node);
    });*/
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
    //console.log(req.body);
    //redis.lset(req.body.id,req.body.inde)
};


exports.batchUpdate = function(req, res) {
    for (var i = req.body.length - 1; i >= 0; i--) {
      console.log(req.body[i])
        obj.update({
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
    obj.findById(req.params.id, function(err, node) {
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
