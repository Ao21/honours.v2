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
var Document = require('./document.model');
var mammoth = require("mammoth");
var fs = require('fs');
var path = require('path');
var config = require('../../config/environment');


// Get list of things
exports.index = function(req, res) {
    Document.find(function(err, Document) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, Document);
    });
};

// Get a single thing
exports.show = function(req, res) {
    Document.findById(req.params.id, function(err, document) {
        if (err) {
            return handleError(res, err);
        }
        if (!document) {
            return res.send(404);
        }
        return res.json(Document);
    });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
    Document.find({
        'source': req.body.source,
        'target': req.body.target
    }, function(err, docs) {
        if (err) {
            console.log(err);
        }
        if (docs.length === 0) {
            Document.create(req.body, function(err, document) {
                if (err) {
                    return handleError(res, err);
                }
                return res.json(201, document);
            });
        } else {
            return res.send(400, 'Document Already Exists');
        }
    })
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Document.findById(req.params.id, function(err, document) {
        if (err) {
            return handleError(err);
        }
        if (!document) {
            return res.send(404);
        }
        var updated = _.merge(document, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(err);
            }
            return res.json(200, document);
        });
    });
};


exports.convert = function(req, res) {
  console.log();
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        console.log("Uploading: " + filename);
        fstream = fs.createWriteStream(path.join(config.root+config.directory) +'assets/uploads/' + filename);
        file.pipe(fstream);
        fstream.on('close', function() {
          
          fs.unlink('./client/assets/uploads/' + filename);

        });
    });

    /*var data = new Buffer('');
    req.on('data', function(chunk) {
        data = Buffer.concat([data, chunk]);
    });

    req.on('end', function() {
        req.rawBody = data;
        var arrayBuffer = new Uint8Array(data).buffer;

        mammoth.convertToHtml({
            arrayBuffer: arrayBuffer
        })
            .then(function(result) {
                var html = result.value; // The generated HTML
                var messages = result.messages; // Any messages, such as warnings during conversion
                console.log(html);
            })
            .done();
    });*/


};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
    Document.findById(req.params.id, function(err, document) {
        if (err) {
            return handleError(res, err);
        }
        if (!document) {
            return res.send(404);
        }
        Document.remove(function(err) {
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
