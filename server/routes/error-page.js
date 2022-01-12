const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.json('error');
});

module.exports = router;