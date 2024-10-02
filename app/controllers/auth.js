const views = require("../utils/view-constants");

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

module.exports = {
  renderLogInPage,
  renderRegisterPage,
};
