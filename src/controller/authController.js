const User = require("../model/user");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const signIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");

  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          {
            userId: user.id,
            // name: user.name,
            username: user.username,
          },
          "qwerty"
        );

        res.send({token});
      } else {
        res.status(401).send("Authentication failed");
      }
    });
  } else {
    res.status(401).send("Authentication failed");
  }
};

const signOut = async (req, res, next) => {
  req.session.destroy();
  res.send("Success");
};

module.exports = {
  signIn,
  signOut,
};
