const express = require("express");
const { renderExpensePage } = require("../controllers/expense");
const router = express.Router();

router.get("/", renderExpensePage);

module.exports = router;