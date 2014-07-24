'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TopicModel = new Schema({
  name: String,
  group: {type:Number, default:0},
  connectedTo:[String],
  type: String,
  keywords: [String],
  instance:Schema.Types.ObjectId,
  radius: {type:Number, default:60},
  width: {type:Number, default:120},
  height: {type:Number, default:120},
  x:Number,
  y:Number,
  fixed:Boolean
});

TopicModel.virtual('id').get(function(){
    return this._id.toHexString();
});

TopicModel.set('toJSON', {
    virtuals: true
});


module.exports = mongoose.model('Topic', TopicModel);