// require('../connection/db')
const mongoose = require('mongoose')

var entrySchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    date: {
      type: Date,
      default: Date.now()
    }
  });
              
var Entry = mongoose.model('Entries', entrySchema);



module.exports = Entry

