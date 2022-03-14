/* eslint-disable consistent-return */

const Card = require("../models/card");
const ForbiddenError = require("../errors/forbiddenError");
const NotFoundError = require("../errors/notFoundError");
const ValidationError = require("../errors/validationError");

const getCards = (req, res, next) => {
  Card.find()
    .then((cards) => res.status(200).send(cards))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => next(new ValidationError(err)));
};

const deleteCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findOne({ _id: req.params.cardId })
    .orFail(() => new NotFoundError("Карточка не найдена"))
    .then((card) => {
      if (!card.owner.equals(owner)) {
        next(new ForbiddenError("Нет прав на удаление этой карточки"));
      } else {
        return Card.deleteOne(card).then(() => res.status(200).send({ message: "Карточка удалена" }));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ValidationError("Невалидный id карточки"));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError("Карточка места не найдена"));
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => next(err));
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError("Карточка не найдена"));
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => next(err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
