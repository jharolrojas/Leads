const { IdentificationType } = require("../models/identificationType.model");
const { catchAsync } = require("../utils/catchAsync.util.js");
const { AppError } = require("../utils/appError.util");

const getAllTypes = catchAsync(async (req, res, next) => {
  const types = await IdentificationType.findAll({
    exclude: ["createdAt", "updatedAt"],
  });
  res.status(200).json({
    status: "success",
    data: { types },
  });
});

const createType = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const type = await IdentificationType.create({ name });

  if (!type) {
    return next(new AppError("Error", 407));
  }

  res.status(201).json({
    status: "success",
  });
});

module.exports = {
  getAllTypes,
  createType,
};
