const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const AuthError = require('../errors/AuthError')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Жак-Ив Кусто",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    default: "Исследователь",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator(url) {
        return /^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([A-Za-z]{1,10})([\w\W\d]{1,})?$/.test(url);
      },
      message: (props) => `${props.value} not valid URL!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email)
      },
      message: (props) => `${props.value} not valid email!`,
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false, // необходимо добавить поле select
    validate: {
      validator(password) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(password)
      },
      message: (props) => `${props.value} is not valid password.`
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
  .then(user => {
    // не нашёлся — отклоняем промис
    if (!user) {
      throw new AuthError('Неправильные почта или пароль');
    }
    // получаем объект пользователя, если почта и пароль подошли
    return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new AuthError('Неправильные почта или пароль');
        }
          return user; // теперь user доступен
        });
  });
};


module.exports = mongoose.model('user', userSchema);
