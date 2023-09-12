const express = require('express');
const router = express.Router();

router.use('/purchases', require("./purchases"));

module.exports = router;