const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StadiumSchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  capacity: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Stadium', StadiumSchema);