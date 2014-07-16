'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ConnectionSchema = new Schema({
  source: Schema.Types.ObjectId,
  target: Schema.Types.ObjectId,
  instance:Schema.Types.ObjectId,
  value:Number
});

module.exports = mongoose.model('Connection', ConnectionSchema);