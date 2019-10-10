const router = require('express').Router();

const register = require('./register');
const register = require('./login');

router.post('/register', async (req, res, next) => {
  register(req, res, next);
});

router.post('/login', async (req, res, next) => {
  login(req, res, next);
});

module.exports = router;
