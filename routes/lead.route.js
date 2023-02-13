const express = require('express');
const {createLeadValidators} = require("../middlewares/validator.middleware")
const {protectSession} = require("../middlewares/protectSession.middleware")
const {protectOperator} = require("../middlewares/auth.middleware")

// Controllers
const {
    getAllLead,
    createLead,
    updateLead,
    statusLead
} = require('../controllers/lead.controller');


const leadRouter = express.Router();

leadRouter.use(protectSession)

leadRouter.post('/',  createLeadValidators,protectOperator,createLead);

leadRouter.patch('/:leadId',  updateLead);

leadRouter.patch('/status/:leadId',  statusLead);

leadRouter.get('/', getAllLead);

module.exports = { leadRouter };
