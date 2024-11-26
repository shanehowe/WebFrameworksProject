const User = require("../../models/userModel");

async function register(request, response) {
  const { username, password, confirmPassword } = request.body;
  if (!username || !password) {
    response.status(400).json({ error: "Username and password are required" });
    return;
  }

  if (password !== confirmPassword) {
    response.status(400).json({ error: "Passwords do not match" });
    return;
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    response.status(400).json({ error: "User already exists" });
    return;
  }

  const user = new User({ username });
  await user.setPassword(password);
  await user.save();
  response.status(201).json(user);
}

function logOutUser(request, response) {
  request.session.destroy();
  response.redirect("/");
}

module.exports = {
  register,
  logOutUser,
};
