const {Schema, model} = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");



const userSchema = Schema(
    {
      username: {
        type: String,
        required: [true, 'Set name for user'],
      },
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null
      },
      avatarURL: {
        type: String,
        required: true,
    }

}, { versionKey: false, timestamps: true });

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'org'] },
      })
      .required(),
    password: Joi.string().min(5).required(),
    subscription: Joi.string(),
});

const loginSchema = Joi.object({
    email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org'] },
    })
    .required(),
  password: Joi.string().min(5).required(),
})

const User = model('user', userSchema);

const schemas = {
    registerSchema,
    loginSchema,
}

module.exports = {
    User,
    schemas
}