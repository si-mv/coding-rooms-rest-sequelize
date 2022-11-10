const { Router } = require("express");
const userRouter = Router();
const User = require("../models/user");
const getUser = require("../middleware/getUser");
const { body, validationResult } = require("express-validator");

userRouter.post(
  "/",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const user = await User.create(req.body);
    res.status(201).send({ user });
  }
);

userRouter.get("/:id", getUser, async (req, res) => {
  res.status(200).send({ user: req.user });
});

userRouter.put("/:id", getUser, async (req, res) => {
  await req.user.update(req.body);
  res.status(200).send({ user: req.user });
});

userRouter.delete("/:id", getUser, async (req, res) => {
  await req.user.destroy();
  res.status(200).send({ user: req.user });
});

module.exports = userRouter;
