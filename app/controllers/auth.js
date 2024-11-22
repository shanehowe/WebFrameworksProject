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
 * @param _request
 * @param {import("express").Response} response - The Express response object.
 */
function renderRegisterPage(_request, response) {
  response.render(views.signup);
}

async function registerUser(request, response) {
  const { username, password, confirmPassword } = request.body;
  try {
    // don't save response, as long as no error its fine
    await httpClient.post("/register", { username, password, confirmPassword });
    response.redirect("/expense");
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : "Something unexpected happened";
    response.render(views.signup, { error: errorMessage });
  }
}

module.exports = {
  renderLogInPage,
  renderRegisterPage,
  registerUser,
};
