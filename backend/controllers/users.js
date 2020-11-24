const bcrypt = require('bcryptjs'); // импортируем bcrypt
const User = require('../models/user');
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const { NODE_ENV, JWT_SECRET } = process.env;

// запрос всех юзеров
const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// запрос 1го юзера по id
const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Oops, that user doesn\'t exist')
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Please type a right data!')
      }
      next(err);
    });
};

// создание нового пользователя
const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.findOne({ email })
        .then((user) => {

          if (!user) {
            User.create({name, about, avatar, email, password: hash})
              .then((user) => res.send(user))
            }
            throw new ConflictError('Email already exist')

        })
        .catch(next)
    })
    .catch(next);
}

// вход в систему
const login = (req, res, next) => {
  const {email, password} = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

// получение себя
const getUserInfo = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('That user doesn\'t exist')
      }
      res.send(user);
    })
    .catch(next)
}

// обновление информации пользователя
const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about },{
    new: true,
    runValidators: true,
  })
    .then((updateUser) => {
      res.send((updateUser));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Please type a right data!');
      }
      next(err);
    });
};

//обновление своей аватарки
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((userNewAvatar) => {
      res.send((userNewAvatar));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Ошибка валидации');
      }
      next(err);
    });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  login,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar
};