const views = require("../utils/view-constants");

/**
 * Render the expense page
 * 
 * @param {import("express").Request} request - The Express request object.
 * @param {import("express").Response} response - The Express response object.
 */
function renderExpensePage(request, response) {
  if (!request.isAuthenticated()) {
    return response.redirect("/auth/login");
  }
  response.render(views.expense);
}

module.exports = {
  renderExpensePage,
};