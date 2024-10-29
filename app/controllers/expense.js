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
  const expenses = apiResponse.data;
  const statistics = aggregateExpenses(expenses);
  response.render(views.expense, {
    expenses: expenses,
    total: statistics.total,
    maxPurchase: statistics.maxPurchase,
    food: statistics.categories.food || 0,
    entertainment: statistics.categories.entertainment || 0,
    travel: statistics.categories.travel || 0,
  });
}

module.exports = {
  renderExpensePage,
};