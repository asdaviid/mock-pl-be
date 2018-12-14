const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'standard']
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcryptjs.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};