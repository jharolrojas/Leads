const { UserRole } = require("../models/userRole.model");
const { catchAsync } = require("../utils/catchAsync.util.js");
const { AppError } = require("../utils/appError.util");

const getAllUserRole = catchAsync(async (req, res, next) => {
  const roles = await UserRole.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  res.status(200).json({
    status: "success",
    data: { roles },
  });
});

const createUserRole = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const newRole = await UserRole.create({ name });

  if (!newRole) {
    return next(new AppError("Error", 407));
  }

  res.status(201).json({
    status: "success",
  });
});

module.exports = {
  getAllUserRole,
  createUserRole,
};
