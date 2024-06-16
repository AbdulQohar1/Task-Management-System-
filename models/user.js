const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require
('jsonwebtoken');

// create user schema 
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    minLength: 3,
    maxLength: 60,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minLength: 6,
    maxLength: 1024,
  },
});

// Encrypting User token
UserSchema.pre('save' , async function(next) {

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next()
});

// creating user token
UserSchema.methods.createToken = function () {
  return jwt.sign({ 
    userId: this._id,
    name: this.name}, 
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME
    }
  );
};

// validating salted password using the compare method
UserSchema.methods.comparePassword = async function (inputedPassword) {
  const passwordMatch =  await bcrypt.compare(inputedPassword , this.password);
  return passwordMatch;
};

UserSchema.methods.getName = function () {
  return this.name
};

module.exports = mongoose.model('User' , UserSchema);