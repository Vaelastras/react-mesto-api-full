const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getAllCards, createCard, cardDeleteById, addLike, deleteLike } = require('../controllers/cards');

router.get('/cards', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().max(24),
  }),
}), getAllCards);

router.post('/cards', createCard);
router.delete('/cards/:cardId', cardDeleteById);

router.put('cards/:cardId/likes', addLike)
router.delete('cards/:cardId/likes', deleteLike)

module.exports = router;
