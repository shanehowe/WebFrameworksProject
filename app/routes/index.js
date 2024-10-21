const express = require('express');
const router = express.Router();
const { renderIndexPage } = require('../controllers/index');

/* GET home page. */
router.get('/', renderIndexPage);

module.exports = router;
