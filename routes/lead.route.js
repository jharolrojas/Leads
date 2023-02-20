const express = require("express");
const { createLeadValidators } = require("../middlewares/validator.middleware");
const { protectSession } = require("../middlewares/protectSession.middleware");
const { protectOperator } = require("../middlewares/auth.middleware");

// Controllers
const {
  getAllLead,
  createLead,
  updateLead,
  statusLead,
} = require("../controllers/lead.controller");

const leadRouter = express.Router();

leadRouter.get("/", getAllLead);

leadRouter.use(protectSession);

leadRouter.post("/", createLeadValidators, createLead);

leadRouter.patch("/:leadId", updateLead);

leadRouter.delete("/status/:leadId", statusLead);

module.exports = { leadRouter };
