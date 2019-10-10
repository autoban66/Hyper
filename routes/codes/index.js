const router = require('express').Router();

const add = require('./add');
const register = require('./register');

router.post('/', async (req, res, next) => {
  add(req, res, next);
});

router.post('/register', async (req, res, next) => {
  register(req, res, next);
});

module.exports = router;
