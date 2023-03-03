const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { subscription, email, password } = req.body;
  const user = await User.findOne({email});
  if (user) {
    throw new Conflict("Email in use");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ subscription, email, password: hashPassword });
  res.status(201).json({
    stetus: 'success',
    status: '201 Created',
    user: {
      'subscription': subscription,
      'email': email,
      'password': password
    },
  });
};

module.exports = signup;
