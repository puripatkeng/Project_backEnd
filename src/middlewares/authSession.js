const jwt = require("jsonwebtoken");
const User = require("../model/user");

const authSession = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    const decoded = jwt.verify(token, "qwerty", (err, decoded) => {
      if (err) {
        throw new Error("invalid authorization");
      }
      return decoded;
    });

    console.log(decoded);
    if (!decoded.userId)
      return res.status(401).send("You are not authenticated");

    req.user = await User.findOne({ id: decoded.userId });

    if (!req.user) return res.status(401).send("You are not authenticated");

    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = authSession;
