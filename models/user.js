const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const crypto = require('crypto')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxLength: [40, 'Name should be greater than 40 chars']
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        validate: [validator.isEmail, 'Please provide proper email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        maxLength: [6, 'Name should be greater than 6 chars'],
        select: false
    },
    role: {
        type: String,
        default: 'user',
    },
    photo: {
        id: {
            type: String,
            required: true
        },
        secureUrl: {
            type: String,
            required: true
        }
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }

})


// password encryption before saving


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10)
})


// validate the pass with user passwaord 
userSchema.methods.isValidatedPassword = async function (userSendPass) {
    return await bcrypt.compare(this.password, userSendPass)
}


// create and return jwt token
userSchema.methods.getJwtToken = async function () {
    jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
}


// generate forgot password token (string)
userSchema.methods, getForgotPasswordToken = function () {


    //    generate a long and random String 
    const forgotToken = crypto.randomBytes(20).toString('hex')
    this.forgotPasswordToken = crypto.createHash('sha256').update(forgotToken).digest('hex')

    // time of token
    this.forgotPasswordTokenExpiry = Date.now() + 20 * 60 * 1000

    return forgotToken
}






module.exports = mongoose.model('User', userSchema)