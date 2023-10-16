const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.01/book-search', {
  //useNewUrlParser: true,
 // useUnifiedTopology: true,
  //useCreateIndex: true,
  //useFindAndModify: false,
});

module.exports = mongoose.connection;
