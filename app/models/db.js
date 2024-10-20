const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI

try {
  mongoose
    .connect(MONGO_URI)
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