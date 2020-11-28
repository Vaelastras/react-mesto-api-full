const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getAllCards, createCard, cardDeleteById, addLike, deleteLike } = require('../controllers/cards');


//получение всех карт
router.get('/cards', getAllCards);

//создание новой карты
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().max(30).min(2).required(),
    link: Joi.string().required().pattern(/^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([a-zA-Z]{1,10})([\w\W\d]{1,})?$/),
  })
}), createCard);

//удаление конкретной карты по ид
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), cardDeleteById);

//постановка лайка
router.put('/cards/likes/:cardId',
  celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}),
  addLike)

//удаление лайка
router.delete('/cards/likes/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24),
    }),
  }),
  deleteLike)


module.exports = router;
