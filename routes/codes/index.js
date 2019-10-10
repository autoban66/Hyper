const router = require('express').Router();

const add = require('./add');

router.post('/', async (req, res, next) => {
  add(req, res, next);
});

module.exports = router;
