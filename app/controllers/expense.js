const views = require("../utils/view-constants");
const Expense = require("../models/expenseModel");
const { aggregateExpenses } = require("../utils/expense_statistics");

/**
 * Render the expense page
 * 
 * @param {import("express").Request} _request - The Express request object.
 * @param {import("express").Response} response - The Express response object.
 */
async function renderExpensePage(_request, response) {
  const expenses = await Expense.find({});
  const statistics = aggregateExpenses(expenses);
  response.render(views.expense, {
    expenses: expenses,
    total: statistics.total,
    maxPurchase: statistics.maxPurchase,
    groceries: statistics.categories.groceries || 0,
    entertainment: statistics.categories.entertainment || 0,
    travel: statistics.categories.travel || 0,
  });
}

module.exports = {
  renderExpensePage,
};