const express = require("express");
const { celebrate, Joi } = require("celebrate");

const router = express.Router();

const {
  getUsers,
  getProfile,
  editUserProfile,
  editUserAvatar,
  getMyProfile,
} = require("../controllers/users");

router.get("/users/me", getMyProfile);
router.get("/users", getUsers);
router.get(
  "/users/:userId",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().length(24).hex(),
    }),
  }),
  getProfile,
);
router.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  editUserProfile,
);
router.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/,
        ),
    }),
  }),
  editUserAvatar,
);

module.exports = router;
