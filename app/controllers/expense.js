const views = require("../utils/view-constants");
const Expense = require("../models/expenseModel");

/**
 * Render the expense page
 * 
 * @param {import("express").Request} _request - The Express request object.
 * @param {import("express").Response} response - The Express response object.
 */
async function renderExpensePage(_request, response) {
  const expenses = await Expense.find({});
  response.render(views.expense, {
    expenses: expenses,
  });
}

module.exports = {
  renderExpensePage,
};