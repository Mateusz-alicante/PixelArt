// require('../connection/db')
const mongoose = require('mongoose')

var entrySchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    date: {
      type: Date,
      default: Date.now()
    },
    comments: Array
  });
              
var Entry = mongoose.model('Entries', entrySchema);



module.exports = Entry

