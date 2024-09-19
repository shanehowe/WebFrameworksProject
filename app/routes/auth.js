const express = require("express");
const { renderLogInPage, renderRegisterPage } = require("../controllers/auth");
const router = express.Router();

router.get("/login", renderLogInPage);
router.get("/register", renderRegisterPage);

module.exports = router;
