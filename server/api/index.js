const express = require('express');
const router = express.Router();

router.use('/user', require("./user"));
router.use('/group', require("./group"))
router.use('/post', require("./post"))
router.use('/comment', require("./comment"))

module.exports = router;