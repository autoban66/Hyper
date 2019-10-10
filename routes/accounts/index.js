const router = require('express').Router();
const passport = require('passport');

const register = require('./register');
const login = require('./login');
const changePassword = require('./changePassword');

router.post('/', async (req, res, next) => {
  register(req, res, next);
});

router.post('/login', async (req, res, next) => {
  login(req, res, next);
});
router.put(
  '/password',
  [passport.authenticate('jwt', { session: false })],
  async (req, res, next) => {
    changePassword(req, res, next);
  }
);

module.exports = router;
