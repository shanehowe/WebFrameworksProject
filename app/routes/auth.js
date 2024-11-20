const express = require("express");
const { renderLogInPage, renderRegisterPage, registerUser } = require("../controllers/auth");
const router = express.Router();

router.get("/login", renderLogInPage);
router.get("/register", renderRegisterPage);
router.post("/register", registerUser);

module.exports = router;
