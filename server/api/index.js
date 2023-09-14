const express = require('express');
const router = express.Router();

router.use('/purchases', require("./purchases"));
router.use('/products', require("./products"))

module.exports = router;