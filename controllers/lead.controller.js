const { Lead } = require("../models/lead.model");
const { Service } = require("../models/service.model");
const { catchAsync } = require("../utils/catchAsync.util.js");
const { AppError } = require("../utils/appError.util");

const getAllLead = catchAsync(async (req, res, next) => {
  const leads = await Lead.findAll({ exclude: ["createdAt", "updatedAt"] });

  res.status(200).json({
    status: "success",
    data: { leads },
  });
});

const createLead = catchAsync(async (req, res, next) => {
  const { name, lastName, gender, negotationStatus, serviceId, dni } = req.body;

  const { sessionUser } = req;

  const service = await Service.findOne({ where: { id: serviceId } });

  if (!service) {
    return next(new AppError("Error, Service not found", 404));
  }

  const lead = await Lead.create({
    name,
    lastName,
    gender,
    negotationStatus,
    serviceId,
    dni,
    identificationTypeId,
    userId: sessionUser.id,
  });

  if (!lead) {
    return next(new AppError("Error", 412));
  }

  res.status(201).json({
    status: "success",
  });
});

const updateLead = catchAsync(async (req, res, next) => {
  const { name, lastName, gender, negotationStatus, serviceId ,dni,identificationTypeId} = req.body;
  const { leadId } = req.params;

  const lead = await Lead.findOne({ where: { id: leadId } });
  if (!lead) {
    return next(new AppError("Lead , not found", 404));
  }

  await lead.update({ name, lastName, gender, negotationStatus, serviceId });

  res.status(200).json({
    status: "success",
  });
});
const statusLead = catchAsync(async (req, res, next) => {
  const { leadId } = req.params;

  const lead = await Lead.findOne({ where: { id: leadId } });
  if (!lead) {
    return next(new AppError("Error, lead not found", 404));
  }

  await lead.update({
    negotationStatus: !lead.negotationStatus,
  });

  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  getAllLead,
  createLead,
  updateLead,
  statusLead,
};
