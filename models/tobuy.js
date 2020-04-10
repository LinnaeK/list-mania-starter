var mongoose = require('mongoose')
var Schema = mongoose.Schema

var toBuySchema = new Schema({
  item: {type: String, required: true},
  price: {type: Number},
  purchased: {type: Boolean, default: false}
},{
  timestamps: true
});

module.exports = mongoose.model('ToBuy', toBuySchema);