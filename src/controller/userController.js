const User = require("../model/user");

const { v4: uid } = require("uuid");

const createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // const { username, password, name } = req.body;

    // const userData = { user_id: uid(), username, password, name };
    const userData = { user_id: uid(), username, password };

    const newUser = new User(userData);

    await newUser.save();

    res.send("Register Success");
  } catch (error) {
    res.send(error);
  }
};

const getUserById = async (req, res, next) => {
  const { user_id } = req.params;

  const user = await User.findOne({ user_id });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  res.send(user);
};

module.exports = {
  createUser,
  getUserById,
};
