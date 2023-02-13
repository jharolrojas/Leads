const express = require('express');

const {createIdentificationTypeValidators} = require("../middlewares/validator.middleware")

const {
    getAllTypes,
    createType,
} = require('../controllers/indentificationType.controller');


const TypesRouter = express.Router();

TypesRouter.post('/',  createIdentificationTypeValidators,createType);

TypesRouter.get('/', getAllTypes);



module.exports = { TypesRouter };
