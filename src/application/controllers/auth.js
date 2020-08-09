const User = require('../models/user');

exports.signup = async (req, res) => {
  const data = req.body;

  try {
    const user = new User(data);
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    // TODO Return a better error
    res.status(400).json(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    // TODO Return a better error
    res.status(400).json(error);
  }
};

exports.logout = async (req, res) => {
  res.status(200).json({
    token: null,
  });
};
