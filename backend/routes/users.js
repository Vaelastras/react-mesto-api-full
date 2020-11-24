const router = require('express').Router();
const {celebrate, Joi} = require('celebrate')

const { getAllUsers, getUserById, getUserInfo, updateUserInfo, updateUserAvatar } = require('../controllers/users');

//получение всех юзеров
router.get('/users', getAllUsers);

//получение себя
router.get('/users/me',
  celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().max(30).min(2),
    about: Joi.string().required().max(30).min(2),
  }),
}),
  getUserInfo);

//получение 1го юзера по ид
router.get('/users/:userId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().length(24),
  }),
}), getUserById);

//обновление инфо юзера
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().max(30).min(2),
    about: Joi.string().required().max(30).min(2),
  }),
}), updateUserInfo);

//обновление аватары пользователя
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([a-zA-Z]{1,10})([\w\W\d]{1,})?$/),
  }),
}), updateUserAvatar);

module.exports = router;
