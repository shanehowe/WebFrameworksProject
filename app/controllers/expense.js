const views = require("../utils/view-constants");

const EXPENSE_DATA = [
  {
    id: 1,
    name: "Netflix",
    amount: 10,
    category: "Entertainment",
  },
  {
    id: 2,
    name: "Rent",
    amount: 1000,
    category: "Housing",
  },
  {
    id: 3,
    name: "Groceries",
    amount: 200,
    category: "Bills",
  },
]

/**
 * Render the expense page
 * 
 * @param {import("express").Request} _request - The Express request object.
 * @param {import("express").Response} response - The Express response object.
 */
function renderExpensePage(_request, response) {
  response.render(views.expense, {
    expenses: EXPENSE_DATA,
  });
}

module.exports = {
  renderExpensePage,
};