'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentModel = new Schema({
  name: String,
  group: {type:Number, default:0},
  connectedTo:[String],
  type: String,
  keywords: [String],
  instance:Schema.Types.ObjectId,
  x:Number,
  y:Number,
  fixed:Boolean,
  status:String,
  user:Schema.Types.ObjectId,
  content:String
});

CommentModel.virtual('id').get(function(){
    return this._id.toHexString();
});

CommentModel.set('toJSON', {
    virtuals: true
});


module.exports = mongoose.model('Comment', CommentModel);