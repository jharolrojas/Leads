const express = require("express");
const {
  createServiceValidators,
} = require("../middlewares/validator.middleware");
const { protectSession } = require("../middlewares/protectSession.middleware");
const {protectAdmin} = require("../middlewares/auth.middleware")


// Controllers
const {
  getAllService,
  createService,
  statusService
} = require("../controllers/service.controller");

const serviceRouter = express.Router();

serviceRouter.use(protectSession);
serviceRouter.post("/", createServiceValidators, createService);

serviceRouter.get("/", getAllService);

serviceRouter.patch("/:serviceId", protectAdmin,statusService);

module.exports = { serviceRouter };
