function aggregateExpenses(expenses) {
  return {
    total: calculateTotal(expenses),
    maxPurchase: getMaxPurchase(expenses),
    categories: sumCategories(expenses),
  };
}

/**
 * @param {import('../models/expense').Expense[]} expenses
 */
function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

/**
 *
 * @param {import('../models/expense').Expense[]} expenses
 */
function getMaxPurchase(expenses) {
  return expenses.reduce((max, expense) => Math.max(max, expense.amount), 0);
}

/**
 * 
 * @param {import('../models/expense').Expense[]} expenses
 * @returns {Object.<string, number>}
 */
function sumCategories(expenses) {
  const categories = {};

  expenses.forEach(expense => {
    if (categories[expense.category]) {
      categories[expense.category] += expense.amount;
    } else {
      categories[expense.category] = expense.amount;
    }
  });

  return categories;
}

module.exports = {
  aggregateExpenses,
};