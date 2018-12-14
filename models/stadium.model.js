const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StadiumSchema = new Schema({
  name: String,
  city: String,
  capacity: String
});

module.exports = mongoose.model('Stadium', StadiumSchema);