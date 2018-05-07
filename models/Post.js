var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  author: String,
  description: String,
});

module.exports = mongoose.model('Post', PostSchema);