/**
 * @param {import('../models/expenseModel')[]} expenses
 * @returns {{total: number, categories: Object<string, number>, maxPurchase: number}}
 */
function aggregateExpenses(expenses) {
  return {
    total: calculateTotal(expenses),
    maxPurchase: getMaxPurchase(expenses),
    categories: sumCategories(expenses),
  };
}

/**
 * @param {import('../models/expenseModel')[]} expenses
 * @returns {number}
 */
function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

/**
 *
 * @param {import('../models/expenseModel')[]} expenses
 * @returns {number}
 */
function getMaxPurchase(expenses) {
  return expenses.reduce((max, expense) => Math.max(max, expense.amount), 0);
}

/**
 * 
 * @param {import('../models/expenseModel')[]} expenses
 * @returns {Object.<string, number>}
 */
function sumCategories(expenses) {
  const categories = {};

  expenses.forEach(expense => {
    const category = expense.category.toLowerCase();
    if (categories[category]) {
      categories[category] += expense.amount;
    } else {
      categories[category] = expense.amount;
    }
  });

  return categories;
}

module.exports = {
  aggregateExpenses,
};