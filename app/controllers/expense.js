const views = require("../utils/view-constants");
const { aggregateExpenses } = require("../utils/expense_statistics");
const httpClient = require("../utils/http-client");

/**
 * Render the expense page
 * 
 * @param {import("express").Request} _request - The Express request object.
 * @param {import("express").Response} response - The Express response object.
 */
async function renderExpensePage(_request, response) {
  const apiResponse = await httpClient.get("/expense");
  const result = apiResponse.data;
  response.render(views.expense, {
    expenses: result.expenses,
    total: result.total,
    maxPurchase: result.maxPurchase,
    food: result.food || 0,
    entertainment: result.entertainment || 0,
    travel: result.travel || 0,
  });
}

module.exports = {
  renderExpensePage,
};