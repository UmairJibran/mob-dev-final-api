const {Schema, model} = require('mongoose');
const Joi = require('joi');
const UserSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    trim: true
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    trim:true,
    unique: true
  },
  password: {
    type: String,
    maxlength: 1000,
    required: true,
  },
  cnic: {
    type: Number,
    minlength: 13,
    maxlength: 13,
    trim: true,
    unique: true,
    required: true
  },
  mobile : {
    type: Number,
    minlength: 13,
    maxlength: 13,
  },
  address: {
    type: String,
    minlength: 10,
    maxlength: 1000
  }
});

const User = model('User', UserSchema);


function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().required().min(5).max(255).email({minDomainSegments:2, tlds: ['com', 'net','org']}),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    cnic:Joi.string().min(13).max(13).required(),
    mobile: Joi.string().required().min(11).max(11),
    address: Joi.string().max(1000),
  });
  return schema.validate(user);
}
module.exports.User = User;
module.exports.validate = validateUser;
