const mongoose = require("mongoose");

try {
  mongoose
    .connect("mongodb://localhost:27017/ExpenseTracker")
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.log(err);
    });
} catch (error) {
  console.log(error);
}

module.exports = mongoose;