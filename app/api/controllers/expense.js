const Expense = require("../../models/expenseModel");

async function getAllExpenses(request, response) {
  const expenses = await Expense.find();
  response.status(200).json(expenses);
}

async function createExpense(request, response) {
  const expense = new Expense(request.body);
  await expense.save();
  response.status(201).json(expense);
}

async function getExpenseById(request, response) {
  const { id } = request.params;
  if (!id) {
    response.status(400).json({ error: "Missing id" });
    return;
  }
  const expense = await Expense.findById(id);
  if (!expense) {
    response.status(404).json({ error: "Expense not found" });
    return;
  }
  response.status(200).json(expense);
}

async function updateExpense(request, response) {
  const { id } = request.params;
  if (!id) {
    response.status(400).json({ error: "Missing id" });
    return;
  }
  const expense = await Expense.findByIdAndUpdate(id, request.body, {
    new: true,
  });
  if (!expense) {
    response.status(404).json({ error: "Expense not found" });
    return;
  }
  response.status(200).json(expense);
}

async function deleteExpense(request, response) {
  const { id } = request.params;
  if (!id) {
    response.status(400).json({ error: "Missing id" });
    return;
  }
  const expense = await Expense.findByIdAndDelete(id);
  if (!expense) {
    response.status(404).json({ error: "Expense not found" });
    return;
  }
  response.status(204).end();
}

module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
};