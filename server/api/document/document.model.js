'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DocumentSchema = new Schema({
  name: String,
  group: {type:Number, default:0},
  users:[Schema.Types.ObjectId],
  type: String,
  keywords: [String],
  privateLock :Boolean,
  content: String,
  createdBy:Schema.Types.ObjectId,
  instance:Schema.Types.ObjectId
});

DocumentSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

DocumentSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Document', DocumentSchema);