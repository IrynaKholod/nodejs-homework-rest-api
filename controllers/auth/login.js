const { Unauthorized } = require("http-errors");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }
  // if(!user){
  //     throw new Unauthorized("Email or password is wrong");
  // }
  // const passwordCompare = bcrypt.compareSync(password, user.password);
  // if(!passwordCompare){
  //     throw new Unauthorized("Email or password is wrong");
  // }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  res.json({
    code: 200,
    data: { token: token, user: { email, subscription } },
  });
};

module.exports = login;
