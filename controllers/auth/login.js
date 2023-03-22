const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../../models/user");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
      }

      if (!user.verify) {
        throw Unauthorized(401, "Email not verify");
      }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    token: token,
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = login;
