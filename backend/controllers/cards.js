const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError'); //400
const NotFoundError = require('../errors/NotFoundError'); //404
const ForbiddenError = require('../errors/ForbiddenError'); //403

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({card}))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(`Validation error. Please type a right data!`)
      }
      next(err);
    });
};

const cardDeleteById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError( `Карточка отсутствует`))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError(`Недостаточно прав для удаления`);
      }
      card.remove()
        .then( () => res.send({ message: 'Карточка удалена' }));
    })

    .catch(next);
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate( req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true },
  )
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((data) => {
      console.log(data)
      res.send(data);
    })
    .catch(next);
}


const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,{ $pull: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((data) => res.send((data)))
    .catch(next);
}



module.exports = {
  getAllCards,
  createCard,
  cardDeleteById,
  addLike,
  deleteLike
};
