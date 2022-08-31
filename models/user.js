const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        max: 100,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

UserSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });

UserSchema.methods.generateAccessToken = function (){
    return jwt.sign({_id: this._id}, config.get('jwtPrivateKey'))
}

UserSchema.methods.verifyPassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('users', UserSchema)


module.exports = User