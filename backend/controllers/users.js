/* eslint-disable consistent-return */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

const User = require("../models/user");
const NotFoundError = require("../errors/notFoundError");
const ConflictError = require("../errors/conflictError");
const ValidationError = require("../errors/validationError");
const AuthError = require("../errors/authError");

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
};

const getProfile = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError("Нет пользователя с таким id"));
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => next(err));
};

const getMyProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError("Данные пользователя не найдены"));
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => next(err));
};

const createUsers = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    return next(new ValidationError("Не переданы email или пароль"));
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send({ data: `${user.name}` });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Пользователь с данным email уже зарегистрирован"));
      } else {
        next(err);
      }
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ValidationError("Неверный пароль или email!"));
  }
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET_KEY : "dev-secret",
        { expiresIn: "7d" },
      );
      return res.status(200).send({ token });
    })
    .catch(() => {
      next(new AuthError("Неверный логин или пароль"));
    });
};

const editUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new ValidationError("Переданы не корректные данные"));
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => next(err));
};

const editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new ValidationError("Переданы не корректные данные"));
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => next(err));
};

module.exports = {
  getUsers,
  getProfile,
  createUsers,
  editUserProfile,
  editUserAvatar,
  loginUser,
  getMyProfile,
};
