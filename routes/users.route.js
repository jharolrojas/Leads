const express = require("express");
const {protectAdmin} = require("../middlewares/auth.middleware")

const {
  getAllUsers,
  createUser,
  updateUser,
  disableAndEnableUser,
} = require("../controllers/users.controller");
const { upload } = require("../utils/multer.util");
const { createUserValidators } = require("../middlewares/validator.middleware");
const { login } = require("../controllers/login.controller");
const { protectSession } = require("../middlewares/protectSession.middleware");

const usersRouter = express.Router();
usersRouter.post(
  "/",
  upload.single("profilePicture"),
  createUserValidators,
  createUser
);

usersRouter.post("/login", login);

usersRouter.use(protectSession,protectAdmin);

usersRouter.patch("/:userId", updateUser);

usersRouter.delete("/:userId",disableAndEnableUser);

usersRouter.get("/",getAllUsers);

module.exports = { usersRouter };
