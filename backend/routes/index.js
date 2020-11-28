const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError')

router.use('/', usersRouter);
router.use('/', cardsRouter);
router.use('/*', (req, res, next) => {
  const err = new NotFoundError("This URL doesn\'t exist. Error Code 00x00099")
  next(err);
});

module.exports = router;
