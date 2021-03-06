'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  passwordHash: {
    type: String
  },

  googleID: {
    type: String
  },

  picture: {
    type: String,
    default:
      'https://res.cloudinary.com/duykugih7/image/upload/v1582549333/jan20/profiledefaultimage_pfl2a5.png'
  },
  bio: {
    type: String,
    maxlength: 200
  }
});

module.exports = mongoose.model('User', schema);
