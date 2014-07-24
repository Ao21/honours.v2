'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TrackModel = new Schema({
  type:String,
  content:String,
  action:String,
  created: { type: Date, default: Date.now },
  userId:{type: Schema.Types.ObjectId, ref:'User'},
  attachedTo: {type: Schema.Types.ObjectId, ref:'Topic'}
});

TrackModel.virtual('id').get(function(){
    return this._id.toHexString();
});

TrackModel.set('toJSON', {
    virtuals: true
});


module.exports = mongoose.model('Track', TrackModel);