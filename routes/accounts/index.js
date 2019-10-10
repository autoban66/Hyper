const router = require('express').Router();
const passport = require('passport');

const register = require('./register');
const login = require('./login');

router.post('/register', async (req, res, next) => {
  register(req, res, next);
});

router.post('/login', async (req, res, next) => {
  login(req, res, next);
});
router.put(
  '/password',
  [passport.authenticate('jwt', { session: false })],
  async (req, res, next) => {}
);

module.exports = router;
