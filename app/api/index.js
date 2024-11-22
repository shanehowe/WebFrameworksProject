const express = require("express");
const router = express.Router();
const expenseController = require("./controllers/expense");
const userController = require("./controllers/user");
const passport = require("passport");

router.get("/expense", expenseController.getAllExpenses);
router.post("/expense", expenseController.createExpense);
router.get("/expense/:id", expenseController.getExpenseById);
router.put("/expense/:id", expenseController.updateExpense);
router.delete("/expense/:id", expenseController.deleteExpense);

router.post("/register", userController.register);

router.post("/login", (req, res) => {
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/expense",
  })(req, res);
});

module.exports = router;
