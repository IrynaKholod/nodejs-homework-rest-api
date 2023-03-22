const { User } = require("../../models/user");
const { sendEmail } = require("../../helpers");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { BASE_URL } = process.env;
require("dotenv").config();

const signup = async (req, res) => {
  const { username, email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const result = await User.create({
    username,
    email,
    avatarURL,
    password: hashPassword,
    subscription,
    verificationToken,
  });

  const VaryfyMail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Confirm your email</a>`,
  };

  await sendEmail(VaryfyMail);

  res.status(201).json({
    stetus: "success",
    status: "201 Created",
    user: {
      username: username,
      email: email,
      avatar: avatarURL,
      password: password,
      subscription: subscription,
    },
  });
};

module.exports = signup;
