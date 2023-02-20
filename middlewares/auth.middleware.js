const { catchAsync } = require("../utils/catchAsync.util.js");
const { AppError } = require("../utils/appError.util");
const { UserRole } = require("../models/userRole.model");

const protectAdmin = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const role = await UserRole.findOne({
    where: { id: sessionUser.userRoleId },
  });

  if (role.name !== "supervisor") {
    return next(new AppError("You do not have the right access level.", 403));
  }

  next();
});

const protectOperator = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const role = await UserRole.findOne({
    where: { id: sessionUser.userRoleId },
  });

  if (role.name !== "vendedor") {
    return next(new AppError("You do not have the right access level.", 403));
  }
  next();
});

module.exports = { protectAdmin, protectOperator };
