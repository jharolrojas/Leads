const { Service } = require("../models/service.model");
const { catchAsync } = require("../utils/catchAsync.util.js");
const { AppError } = require("../utils/appError.util");

const getAllService = catchAsync(async (req, res, next) => {
  const services = await Service.findAll({attributes: { exclude: [ "createdAt", "updatedAt"] }});

  res.status(200).json({
    status: "success",
    data: { services },
  });
});

const createService = catchAsync(async (req, res, next) => {
  const { description } = req.body;

  const service = await Service.create({ description });

  if (!service) {
    return next(new AppError("Error", 407));
  }

  res.status(201).json({
    status: "success",
  });
});

const updateService = catchAsync(async (req, res, next) => {
  const { serviceId } = req.params;
  const {description , status} = req.body;

  const service = await Service.findOne({ where: { id: serviceId } });
  
  if (!service) {
    return next(new AppError("Error, service not found", 404));
  }

  await service.update({
    description , status
  });

  res.status(200).json({
    status: "success",
  });
});

const statusService = catchAsync(async (req, res, next) => {
  const { serviceId } = req.params;

  const service = await Service.findOne({ where: { id: serviceId } });
  
  if (!service) {
    return next(new AppError("Error, service not found", 404));
  }

  await service.update({
    status: !service.status,
  });

  res.status(200).json({
    status: "success",
  });
});


module.exports = {
  getAllService,
  createService,
  statusService,
  updateService
};
