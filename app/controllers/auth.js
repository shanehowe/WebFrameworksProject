const views = require("../utils/view-constants");
const httpClient = require("../utils/http-client");

/**
 * Renders the login page.
 *
 *
 * @param {import("express").Request} _request - The Express request object.
 * @param {import("express").Response} response - The Express response object.
 */
function renderLogInPage(_request, response) {
  response.render(views.login);
}

/**
 * Renders the registration page.
 *
 * @param {import("express").Request} request - The Express request object.
 * @param {import("express").Response} response - The Express response object.
 */
function renderRegisterPage(_request, response) {
  response.render(views.signup);
}

async function registerUser(request, response) {
  const { email, password } = request.body;
  try {
    await httpClient.post("/user/register", { email, password });
    response.redirect("/login");
  } catch (error) {
    response.render(views.signup, { error: "Please ensure all values are filled out" });
  }
}

module.exports = {
  renderLogInPage,
  renderRegisterPage,
  registerUser,
};
