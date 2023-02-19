const express = require("express");
const {
  createServiceValidators,
} = require("../middlewares/validator.middleware");
const { protectSession } = require("../middlewares/protectSession.middleware");
const { protectAdmin } = require("../middlewares/auth.middleware");

// Controllers
const {
  getAllService,
  createService,
  statusService,
  updateService,
} = require("../controllers/service.controller");

const serviceRouter = express.Router();

serviceRouter.get("/", getAllService);

serviceRouter.use(protectSession, protectAdmin);
serviceRouter.post("/", createServiceValidators, createService);
serviceRouter.patch("/:serviceId", updateService);
serviceRouter.delete("/:serviceId", statusService);

module.exports = { serviceRouter };
