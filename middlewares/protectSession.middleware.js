const { User } = require("../models/user.model");
const { catchAsync } = require("../utils/catchAsync.util.js");
const { AppError } = require("../utils/appError.util");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const protectSession = catchAsync(async (req, res, next) => {
  let token;
console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("The token was invalid", 403));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decoded.id, status: true },
  });

  if (!user) {
    return next(
      new AppError("The owner of the session is no longer active", 403)
    );
  }

  req.sessionUser = user;
  next();
});
module.exports = { protectSession };
