const User = require('../../models/userModel');

async function register(request, response) {
  const { email, password } = request.body;
  if (!email || !password) {
    response.status(400).end();
    return;
  }
  const user = new User({ email });
  await user.setPassword(password);
  await user.save();
  response.status(201).json(user);
}

module.exports = {
  register,
};