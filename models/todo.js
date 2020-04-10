var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  task: {type: String, required: true},
  done: {type: Boolean, default: false}
},{
  timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);