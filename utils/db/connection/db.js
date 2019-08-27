let mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/pixelart', {useNewUrlParser: true, useFindAndModify: false});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('Connected to database succesfully')
});

