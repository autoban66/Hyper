const router = require('express').Router();

const register = require('./register');

router.post('/register', async (req, res, next) => {
  register(req, res, next);
});

module.exports = router;
