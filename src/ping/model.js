const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HelloSchema = new Schema({
  count: {
    type: Number,
    required: true
  },
  lastDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('hello', HelloSchema);