'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectModel = new Schema({
  name: String,
  group: {type:Number, default:0},
  connectedTo:[String],
  type: String,
  keywords: [String],
  content: String,
  instance:Schema.Types.ObjectId,
  radius: {type:Number, default:60},
  width: {type:Number, default:120},
  height: {type:Number, default:120},
  posx:Number,
  posy:Number,
  fixed:Boolean
});

ObjectModel.virtual('id').get(function(){
    return this._id.toHexString();
});

ObjectModel.set('toJSON', {
    virtuals: true
});


module.exports = mongoose.model('Object', ObjectModel);