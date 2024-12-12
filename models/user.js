const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nama: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
