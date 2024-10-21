const views = require("../utils/view-constants");

/**
 * Renders the index page.
 * 
 * @param {import('express').Request} _request
 * @param {import('express').Response} response
 */
function renderIndexPage(_request, response) {
  response.render(views.index);
}

module.exports = {
  renderIndexPage,
};